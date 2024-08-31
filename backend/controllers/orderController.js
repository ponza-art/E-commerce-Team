import Order from "../models/order.model.js";
import orderValidateSchema from "../models/validataOrderSchemaJoi.js";
import Product from "../models/product.model.js";

export const getOrder = async (req, res) => {
  try {
    const order = await Order.find();

    if (!order || order.length === 0) {
      return await res.status(404).send("No orders found");
    }

    return await res.status(200).json(order);
  } catch (error) {
    return await res
      .status(500)
      .send("An error occurred while fetching orders");
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id" + id);
    const order = await Order.findById(id);

    if (!order || order.length === 0) {
      return res.status(404).send("No orders found");
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send("An error occurred while fetching orders");
  }
};

export const createOrder = async (req, res) => {
  try {
    const { error } = orderValidateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    await Order.deleteMany({ userId: req.user._id }); //new
    const orderItems = await req.body.order;
    for (let item of orderItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        item.price = product.price;
        
      } else {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }
    }

    const calculateTotalPrice = (order) => {
      return order.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    };

    const totalPrice = calculateTotalPrice(orderItems);

    const newOrder = new Order({
      amount: totalPrice,
      order: orderItems,

      // userDetails: {
      //   fullName: req.user.fullName,
      //   address: req.body.address,
      //   phone: req.body.phone,
      //   email: req.user.email,
      //   pincode: req.body.pincode,
      //   userId: req.user._id,
      // },
      status: "pending",
      isPaid: false,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

///////////////////////////////////////////////////////////
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).send("Order not found ");
    }
    switch (order.status) {
      case "canceled":
        res.status(400).send("the order already cancel");
        break;
      case "processing":
      case "pending":
        order.status = "canceled";
        await order.save();
        res
          .status(200)
          .json({ massege: "order has been canceled succesfully", order });
        break;
      default:
        res.status(400).send("you canot cancel this order");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

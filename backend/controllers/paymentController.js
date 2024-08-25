import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import orderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js"
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// to create order ,payment and db
export const createOrder = async (req, res) => {
  const { amount, order } = req.body;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }
  if (!order) {
    return res.status(400).json({ error: "Order is required" });
  }
  if (!userId) {
    return res.status(401).json({ error: "User not login" });
  }

  const user = await UserModel.findById(userId);
  const userDetails = {
    fullName: user.fullName,
    address: user.address,
    phone: user.phone,
    email: user.email,
    pincode: user.pincode,
    userId: user._id,
  };

  try {
    // Save order
    const newOrder = new orderModel({
      amount,
      order,
      userDetails,
    });
    const savedOrder = await newOrder.save();
    const dbOrderId  = savedOrder._id

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rcp_${dbOrderId}`
    };

    instance.orders.create(options, (err, orderResponse) => {
      if (err) {
        console.error("Error in instance.orders.create:", err);
        return res.status(500).json({ error: "Failed to create order in payment gateway", details: err.message });
      }
      res.send({ orderId: orderResponse.id, amount, dbOrderId});
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// post
export const orderSuccess = async (req, res) => {
  try {
    const { orderId, paymentId } = req.query;
    res.json({ orderId, paymentId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get
export const orderCancel = async (req, res) => {
  try {
    res.send("Payment cancelled");
  } catch (error) {
    res.status(500).send(error);
  }
};



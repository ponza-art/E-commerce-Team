import dotenv from "dotenv";
import orderModel from "../models/order.model.js";
dotenv.config();

export const getAllOrders = async (req, res) => {
      // extract role from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userRole = decoded.role;

  if (userRole !== "admin") {
    return res.status(403).json({ error: "You are unauthorized to do this" });
  }


  try {
    const orders = await orderModel.find({isPaid : true})
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteOrderById = async (req, res) => {
  // Uncomment the role check if needed
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userRole = decoded.role;

  if (userRole !== "admin") {
    return res.status(403).json({ error: "You are unauthorized to do this" });
  }

  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "Order ID is missing" });
  }

  try {
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order: ", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
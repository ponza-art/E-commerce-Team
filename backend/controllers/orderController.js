import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import orderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";

dotenv.config();

// to create an order and save it in the database
export const createOrder = async (req, res) => {
  const { amount, order } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    if (!order) {
      return res.status(400).json({ error: "Order is required" });
    }
    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
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

    // Save order in the database
    const newOrder = new orderModel({
      amount,
      order,
      userDetails,
    });
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order created successfully", orderId: savedOrder._id });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders", details: error.message });
  }
};

// controllers/orderController.js
export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params; // Use req.params to get orderId from URL

  try {
    const result = await orderModel.findByIdAndDelete(orderId);
    if (!result) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order", details: error.message });
  }
};

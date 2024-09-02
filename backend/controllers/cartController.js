import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderModel from "../models/order.model.js";

dotenv.config();

// Function to add product to cart
export const addCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const quantityNum = parseInt(quantity, 10);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    // Using findOneAndUpdate for atomic update
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "cart.productId": productObjectId },
      { $inc: { "cart.$.quantity": quantityNum } },
      { new: true }
    );

    if (!updatedUser) {
      // If the product was not found in the cart, push a new item
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            cart: { productId: productObjectId, quantity: quantityNum },
          },
        },
        { new: true }
      );
    }

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};

export const getCart = async (req, res) => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const user = await UserModel.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};

export const decreaseCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    const quantityNum = parseInt(quantity, 10);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    // Find the user and check if the product exists in the cart
    const user = await UserModel.findOne({
      _id: userId,
      "cart.productId": productObjectId,
    });

    if (!user) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Find the product in the cart
    const cartItem = user.cart.find((item) =>
      item.productId.equals(productObjectId)
    );

    if (cartItem.quantity <= quantityNum) {
      // If quantity to decrease is greater or equal, remove the item from the cart
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { cart: { productId: productObjectId } } },
        { new: true }
      );
    } else {
      // Otherwise, decrease the quantity
      await UserModel.findOneAndUpdate(
        { _id: userId, 'cart.productId': productObjectId },
        { $inc: { 'cart.$.quantity': -quantityNum } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Product quantity decreased successfully" });
  } catch (error) {
    console.error("Error decreasing product quantity in cart:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const productId = req.query.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    const user = await UserModel.findOne({
      _id: userId,
      "cart.productId": productObjectId,
    });

    if (!user) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // removing from db
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { cart: { productId: productObjectId } } },
      { new: true }
    );

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product in cart:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};

export const clearCart = async (req, res) => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const dbOrderId = req.query.dbOrderId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = await orderModel.findById(dbOrderId);
    if (!order) {
      return res.status(404).json({ error: "No orders found" });
    }

    // Change status to paid
    order.isPaid = true;
    await order.save();

    user.cart = [];
    await user.save();

    return res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};

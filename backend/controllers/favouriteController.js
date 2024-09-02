import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderModel from "../models/order.model.js";

dotenv.config();

// Function to add product to cart
export const addfavourite = async (req, res) => {
  const { productId } = req.body;

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    // Verify token and extract userId
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if the product is already in the favourite list
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "favourite.productId": productObjectId },
      { new: true }
    );

    if (!updatedUser) {
      // Add product to the favourite list if not present
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { favourite: { productId: productObjectId } },
        },
        { new: true }
      );
    }

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product to favourite:", error);
    res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
};

export const getFavourite = async (req, res) => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const user = await UserModel.findById(userId).populate(
      "favourite.productId"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favourite);
  } catch (error) {
    console.error("Error retrieving favourite:", error);
    res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
};

export const removeFavouriteItem = async (req, res) => {
  try {
    // Check if Authorization header is present
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    // Extract token from Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Extract productId from query parameters
    const productId = req.query.productId;

    // Debugging output
    console.log("Received productId:", productId);

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if user exists and has the product in favourites
    const user = await UserModel.findOne({
      "favourite.productId": productObjectId,
      _id: userId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Product not found in favourite list" });
    }

    // Remove the product from the user's favourites
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { favourite: { productId: productObjectId } } },
      { new: true }
    );

    return res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product from favourites:", error);
    return res.status(500).json({
      error: "An error occurred while removing the product",
      details: error.message,
    });
  }
};

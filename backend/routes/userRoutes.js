import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getProfileData,
  updateProfileImage,
  updatePassword,
  getAllUsers // Import the new function
} from "../controllers/userController.js";
import { addCart, clearCart, decreaseCart, getCart, removeCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.post("/users", createUser);
router.patch("/users", updateUser);
router.patch("/users/password", updatePassword);
router.post("/users/login", loginUser);
router.get("/users/profile", getProfileData);
router.post("/users/add-image", updateProfileImage);
router.get("/users", getAllUsers); // Add the new route here
// cart routes 
router.get("/users/cart", getCart);
router.delete("/users/cart", removeCartItem);
router.patch("/users/add-cart", addCart);
router.patch("/users/decrese-cart", decreaseCart);
router.delete("/users/clear-cart", clearCart);

export default router;

import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getProfileData,
  updateProfileImage,
  updatePassword,
  getAllUsers,
  createAdmin,
} from "../controllers/userController.js";

import {
  addfavourite,
  getFavourite,
  removeFavouriteItem,
} from "../controllers/favouriteController.js";

import {
  addCart,
  clearCart,
  decreaseCart,
  getCart,
  removeCartItem,
} from "../controllers/cartController.js";

import {
  updateUserSchema,
  loginUserSchema,
  updateProfileImageSchema,
  updatePasswordSchema,
  createAdminSchema,
  addCartSchema,
  decreaseCartSchema,
  addFavouriteSchema,
} from "../validationSchemas.js"; // Importing the schemas

import { validateRequest } from "../middlewares/validationMiddleware.js"; // Importing the middleware

const router = express.Router();

router.post("/users", validateRequest(createAdminSchema), createUser);
router.patch("/users", validateRequest(updateUserSchema), updateUser);
router.patch("/users/password", validateRequest(updatePasswordSchema), updatePassword);
router.post("/users/login", validateRequest(loginUserSchema), loginUser);
router.get("/users/profile", getProfileData);
router.post("/users/add-image", validateRequest(updateProfileImageSchema), updateProfileImage);
router.get("/users", getAllUsers);
router.post("/users/admin", validateRequest(createAdminSchema), createAdmin);

// Cart routes
router.get("/users/cart", getCart);
router.delete("/users/cart", removeCartItem);
router.patch("/users/add-cart", validateRequest(addCartSchema), addCart);
router.patch("/users/decrese-cart", validateRequest(decreaseCartSchema), decreaseCart);
router.delete("/users/clear-cart", clearCart);

// Favourite routes
router.get("/users/favourite", getFavourite);
router.delete("/users/favourite", removeFavouriteItem);
router.post("/users/add-favourite", validateRequest(addFavouriteSchema), addfavourite);

export default router;

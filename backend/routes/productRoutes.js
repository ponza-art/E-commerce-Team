import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getSomeProducts,
  updateAvailability,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/products/product/eight", getSomeProducts);
// admin --- 
router.post("/products", createProduct);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/availability", updateAvailability);

export default router;
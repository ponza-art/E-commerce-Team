import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getSomeProducts,
  getFilters,
  getFilteredProducts,
  updateProduct
} from "../controllers/productController.js";
import { createProductSchema, updateProductSchema } from "../validationSchemas.js"; // Importing the schemas
import { validateRequest } from "../middlewares/validationMiddleware.js"; // Importing the middleware

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/products/pricefilter/:min&:max", getFilteredProducts);
router.get("/products/filter/:filter", getFilters);
router.get("/products/product/eight", getSomeProducts);
// Admin ---
router.post("/products",  createProduct);
router.delete("/products/:productId", deleteProduct);
router.put("/products/:productId", updateProduct);

export default router;

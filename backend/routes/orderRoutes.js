import express from "express";
import { createOrder, getAllOrders, deleteOrderById } from "../controllers/orderController.js";
import { createOrderSchema } from "../validationSchemas.js"; // Importing the schema
import { validateRequest } from "../middlewares/validationMiddleware.js"; // Importing the middleware

const router = express.Router();

router.post("/order/create-order", validateRequest(createOrderSchema), createOrder);
router.get("/order", getAllOrders);
router.delete("/order/:orderId", deleteOrderById);

export default router;

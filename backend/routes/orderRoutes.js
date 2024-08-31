import express from "express";
const router = express.Router();
import  Token from "../middleware/verifytoken.js";
import { cancelOrder, createOrder, getOrder, getOrderById } from "../controllers/orderController.js";

router.get("/orders",Token,getOrder)
router.patch("/orders/cancel/:id",Token,cancelOrder)
router.post("/orders/create",Token ,createOrder);
router.get("/orders/:id",Token ,getOrderById);

export default router;
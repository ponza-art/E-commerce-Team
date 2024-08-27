import express from "express";
const router = express.Router();
import  Token from "../middleware/verifytoken.js";
import { cancelOrder, createOrder, getOrder } from "../controllers/orderController.js";

router.get("/orders",Token,getOrder)
router.patch("/orders/cancel/:id",Token,cancelOrder)
router.post("/orders/create" ,Token,createOrder);

export default router;
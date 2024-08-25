import express from "express";
import { createOrder, orderCancel, orderSuccess } from "../controllers/paymentController.js";
import { deleteOrderById, getAllOrders } from "../controllers/adminOrdersController.js";

const router = express.Router();

router.post("/order/create-order", createOrder);
router.post("./order/order-success", orderSuccess);
router.get("./order/order-cancel", orderCancel)
// orders route 
router.get("/order", getAllOrders)
router.delete("/order", deleteOrderById)

export default router;
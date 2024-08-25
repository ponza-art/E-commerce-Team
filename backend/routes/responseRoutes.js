import express from "express";
import { saveResponse } from "../controllers/contactController.js";

const router = express.Router();

router.post("/response", saveResponse);

export default router;
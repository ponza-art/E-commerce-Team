import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

export const app = express();

app.use(cors());
// set limit for data save size
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", paymentRoutes);
app.use("/", responseRoutes);

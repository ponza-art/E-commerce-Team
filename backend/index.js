import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { requestLogger } from "./middlewares/logger.js"; // Import the middleware function
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { CustomError } from "./middlewares/Error.js";
dotenv.config();

connectDB();

export const app = express();

app.use(cors());
// set limit for data save size
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use(requestLogger); // Use the requestLogger middleware

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/", responseRoutes);

app.use((err, req, res, next) => {
  logger.error(
    `${req.method}${req.url} ` -
      `${new Date().toISOString()}` -
      `Error: ${err.message}`
  );
  if (err instanceof CustomError) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`App listening at port ${process.env.PORT}`);
});

// export default app
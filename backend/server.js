const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const productRouter = require("./routes/productRoute.js");
app.use("/", productRouter);

mongoose.connect("mongodb://localhost:27017/Ecommerce").then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

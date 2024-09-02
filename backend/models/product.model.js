import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: false,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    specifications: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "products" }
);

export default mongoose.model("Product", productSchema);

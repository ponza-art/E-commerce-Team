import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    pincode: {
      type: Number,
      default: null,
    },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      }
    ],
    favourite: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    role: {
      type: String,
      default: "user", 
      enum: ["user", "admin"], 
    },

  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },

  },
  
  { collection: "users" }
);

export default mongoose.model("User", userSchema);



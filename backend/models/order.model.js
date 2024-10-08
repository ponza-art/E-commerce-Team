import mongoose from "mongoose";


const calculateDeliveryDate = () => {
  const orderDate = new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5);
  return deliveryDate;
};

// Define the Order schema
const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  order: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: () => new Date(),
  },
  deliveryDate: {
    type: Date, 
    default: calculateDeliveryDate,
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  userDetails: {
    fullName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    pincode: {
      type: Number,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
}, { collection: 'Orders' });


export default mongoose.model("Order", orderSchema);

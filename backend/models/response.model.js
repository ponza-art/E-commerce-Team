import mongoose from 'mongoose';
const responseSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: String,
      default: null,
    },
  },
  { collection: 'Response' }
);

export default mongoose.model('Response', responseSchema);

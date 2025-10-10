import mongoose from 'mongoose';
const CustomOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
export default mongoose.model('CustomOrder', CustomOrderSchema);

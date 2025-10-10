import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  customerId: mongoose.Schema.Types.ObjectId,
  items: Array,
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Order', OrderSchema);

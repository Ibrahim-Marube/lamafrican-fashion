import mongoose from 'mongoose';
const MediaSchema = new mongoose.Schema({
  filename: String,
  url: String,
  type: String,
  size: Number
}, { timestamps: true });
export default mongoose.model('Media', MediaSchema);

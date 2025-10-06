import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 }
});

const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  sessionId: { type: String, index: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

CartSchema.index({ user: 1, sessionId: 1 });

export default mongoose.model<ICart>('Cart', CartSchema);

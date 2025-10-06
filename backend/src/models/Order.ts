import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './User';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IStatusUpdate {
  status: string;
  timestamp: Date;
  note?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: IAddress;
  paymentMethod: 'stripe' | 'paypal' | 'mpesa';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentIntentId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  promoCode?: string;
  notes?: string;
  statusHistory: IStatusUpdate[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true }
});

const StatusUpdateSchema = new Schema<IStatusUpdate>({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: String
});

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    county: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  paymentMethod: { 
    type: String, 
    enum: ['stripe', 'paypal', 'mpesa'], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending',
    index: true 
  },
  paymentIntentId: String,
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending',
    index: true 
  },
  trackingNumber: String,
  promoCode: String,
  notes: String,
  statusHistory: [StatusUpdateSchema]
}, {
  timestamps: true
});

OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `LF-${dateStr}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model<IOrder>('Order', OrderSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: mongoose.Types.ObjectId;
  images: string[];
  primaryImage: string;
  stock: number;
  sku: string;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  metadata: {
    material?: string;
    color?: string;
    size?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true 
  },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true,
    index: true 
  },
  images: [{ type: String, required: true }],
  primaryImage: { type: String, required: true },
  stock: { type: Number, required: true, default: 0, min: 0 },
  sku: { type: String, required: true, unique: true },
  featured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['active', 'draft', 'archived'], 
    default: 'active',
    index: true 
  },
  metadata: {
    material: String,
    color: String,
    size: String
  }
}, {
  timestamps: true
});

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true 
  },
  description: String,
  image: String,
  parent: { type: Schema.Types.ObjectId, ref: 'Category' }
}, {
  timestamps: true
});

export default mongoose.model<ICategory>('Category', CategorySchema);

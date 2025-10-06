import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'admin' | 'staff' | 'customer';
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  addresses: IAddress[];
  wishlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AddressSchema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  county: { type: String, required: true },
  postalCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true 
  },
  password: { type: String, required: true, select: false },
  phone: String,
  role: { 
    type: String, 
    enum: ['admin', 'staff', 'customer'], 
    default: 'customer' 
  },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  addresses: [AddressSchema],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

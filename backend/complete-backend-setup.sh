#!/usr/bin/env bash
set -euo pipefail
cd "$HOME/lamafrican-fashion/backend"
mkdir -p src/models src/controllers src/routes

cat > src/models/Category.ts << 'EOTS'
import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: String,
  description: String
}, { timestamps: true });
export default mongoose.model('Category', CategorySchema);
EOTS

cat > src/models/Order.ts << 'EOTS'
import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  customerId: mongoose.Schema.Types.ObjectId,
  items: Array,
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Order', OrderSchema);
EOTS

cat > src/models/CustomOrder.ts << 'EOTS'
import mongoose from 'mongoose';
const CustomOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
export default mongoose.model('CustomOrder', CustomOrderSchema);
EOTS

cat > src/models/Customer.ts << 'EOTS'
import mongoose from 'mongoose';
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  phone: String
}, { timestamps: true });
export default mongoose.model('Customer', CustomerSchema);
EOTS

cat > src/models/Inquiry.ts << 'EOTS'
import mongoose from 'mongoose';
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: 'new' }
}, { timestamps: true });
export default mongoose.model('Inquiry', InquirySchema);
EOTS

cat > src/models/Media.ts << 'EOTS'
import mongoose from 'mongoose';
const MediaSchema = new mongoose.Schema({
  filename: String,
  url: String,
  type: String,
  size: Number
}, { timestamps: true });
export default mongoose.model('Media', MediaSchema);
EOTS

cat > src/controllers/categories.ts << 'EOTS'
import Category from '../models/Category';
export const getAll = async (req: any, res: any) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};
EOTS

cat > src/controllers/orders.ts << 'EOTS'
import Order from '../models/Order';
export const getAll = async (req: any, res: any) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
EOTS

cat > src/controllers/customOrders.ts << 'EOTS'
import CustomOrder from '../models/CustomOrder';
export const getAll = async (req: any, res: any) => {
  try {
    const orders = await CustomOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch custom orders' });
  }
};
EOTS

cat > src/controllers/customers.ts << 'EOTS'
import Customer from '../models/Customer';
export const getAll = async (req: any, res: any) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};
EOTS

cat > src/controllers/inquiries.ts << 'EOTS'
import Inquiry from '../models/Inquiry';
export const getAll = async (req: any, res: any) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
};
EOTS

cat > src/controllers/media.ts << 'EOTS'
import Media from '../models/Media';
export const getAll = async (req: any, res: any) => {
  try {
    const files = await Media.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch media' });
  }
};
EOTS

cat > src/routes/categories.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/categories';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > src/routes/orders.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/orders';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > src/routes/customOrders.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/customOrders';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > src/routes/customers.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/customers';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > src/routes/inquiries.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/inquiries';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > src/routes/media.ts << 'EOTS'
import express from 'express';
import { getAll } from '../controllers/media';
const router = express.Router();
router.get('/', getAll);
export default router;
EOTS

cat > MANUAL_SETUP.txt << 'EOTS'
Add these imports at the top of your main server file (src/server.ts or src/index.ts):

import './models/Category';
import './models/Order';
import './models/CustomOrder';
import './models/Customer';
import './models/Inquiry';
import './models/Media';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import customOrderRoutes from './routes/customOrders';
import customerRoutes from './routes/customers';
import inquiryRoutes from './routes/inquiries';
import mediaRoutes from './routes/media';

Add these route mounts after your Express app is created:

app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/custom-orders', customOrderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/media', mediaRoutes);

Then restart backend: npm run dev
EOTS

echo "All models, controllers, and routes created!"
echo "Open MANUAL_SETUP.txt and follow instructions to add imports and routes to your server file."

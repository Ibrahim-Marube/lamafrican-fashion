import mongoose from 'mongoose';
import Product from '../models/Product';
import Category from '../models/Category';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: 'Ankara Maxi Dress - Royal Blue',
    slug: 'ankara-maxi-dress-royal-blue',
    description: 'Beautiful royal blue Ankara maxi dress with elegant patterns',
    price: 8500,
    primaryImage: '/images/products/maxi-dress/maxi1.jpg',
    images: ['/images/products/maxi-dress/maxi1.jpg'],
    stock: 10,
    sku: 'AMD-001',
    featured: true,
    status: 'active',
  },
  {
    name: 'Ankara Bomber Jacket - Sunset',
    slug: 'ankara-bomber-jacket-sunset',
    description: 'Stylish bomber jacket with vibrant sunset colors',
    price: 12000,
    primaryImage: '/images/products/bomber-jackets/bomber1.jpg',
    images: ['/images/products/bomber-jackets/bomber1.jpg'],
    stock: 8,
    sku: 'ABJ-001',
    featured: true,
    status: 'active',
  },
  {
    name: 'African Men Shirt - Classic',
    slug: 'african-men-shirt-classic',
    description: 'Classic African print men\'s shirt',
    price: 6500,
    primaryImage: '/images/products/men-shirts/men-shirt-1.jpg',
    images: ['/images/products/men-shirts/men-shirt-1.jpg'],
    stock: 15,
    sku: 'AMS-001',
    featured: false,
    status: 'active',
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Find or create default category
    let category = await Category.findOne({ name: 'General' });
    if (!category) {
      category = await Category.create({
        name: 'General',
        slug: 'general',
        description: 'General products',
      });
      console.log('Created default category');
    }

    // Add category to products
    const productsWithCategory = sampleProducts.map(p => ({
      ...p,
      category: category!._id,
    }));

    await Product.deleteMany({});
    await Product.insertMany(productsWithCategory);

    console.log(`✅ Seeded ${sampleProducts.length} products successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedProducts();

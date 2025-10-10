const mongoose = require('mongoose');
require('dotenv').config();

async function resetAdmin() {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) throw new Error('MONGODB_URI not found in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'lamafricanfashion@gmail.com';
    const hashedPassword = '$2b$10$L0HMp4QBsMUX2H1e8W5hlu6cW4Otx2XIzPIs8YDgesY88v4PpjdQ2';

    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      username: String,
      password: String,
      role: String,
      isAdmin: Boolean,
      createdAt: Date,
      updatedAt: Date
    }));

    const result = await User.updateOne(
      { $or: [{ email: email }, { username: 'admin' }] },
      {
        $set: {
          email: email,
          username: 'admin',
          password: hashedPassword,
          role: 'admin',
          isAdmin: true,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('✅ Admin credentials updated successfully!');
    console.log('');
    console.log('Login with:');
    console.log('  Email: lamafricanfashion@gmail.com');
    console.log('  Password: Lamafrican2025!');
    console.log('');
    console.log('Database result:', result);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdmin();

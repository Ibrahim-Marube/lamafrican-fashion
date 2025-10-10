require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const newPassword = 'Admin@123'; // Change this if you want

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      role: String,
      password: String
    }));
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const result = await User.updateOne(
      { email: 'lamafricanfashion@gmail.com' },
      { password: hashedPassword }
    );
    
    if (result.modifiedCount > 0) {
      console.log('✅ Admin password updated successfully!\n');
      console.log('Login Details:');
      console.log('==============');
      console.log('Email: lamafricanfashion@gmail.com');
      console.log('Password: Admin@123');
    } else {
      console.log('❌ Failed to update password');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });

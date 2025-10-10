require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas\n');
    
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      role: String,
      password: String
    }));
    
    const users = await User.find({}, 'name email role');
    
    console.log('📋 Existing Users:');
    console.log('==================');
    
    if (users.length === 0) {
      console.log('❌ No users found\n');
    } else {
      users.forEach((user, i) => {
        console.log(`${i + 1}. ${user.email} | Role: ${user.role || 'N/A'}`);
      });
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Hash password
    const hashedPassword = await bcrypt.hash('0a0b0c0d', 10);

    // Create admin user
    const admin = new User({
      email: 'pattrentalservices@gmail.com',
      password: '0a0b0c0d',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin:', error.message);
    }
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

createAdmin();
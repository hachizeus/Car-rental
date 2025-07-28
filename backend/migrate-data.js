require('dotenv').config();
const mongoose = require('mongoose');

// Car schema
const carSchema = new mongoose.Schema({
  title: String,
  description: String,
  price_per_day: Number,
  category: String,
  location: String,
  features: [String],
  is_available: Boolean,
  engine: String,
  transmission: String,
  fuel_type: String,
  seats: Number,
  year: Number,
  mileage: String,
  images: [{
    url: String,
    is_primary: Boolean
  }],
  videos: [String]
}, { timestamps: true });

async function migrateCars() {
  try {
    // Connect to OLD database
    const oldConnection = await mongoose.createConnection('mongodb+srv://pattrentalservices:0a0b0c0d@pattrentals.qasxp8f.mongodb.net/?retryWrites=true&w=majority&appName=pattrentals');
    const OldCar = oldConnection.model('Car', carSchema);
    
    // Connect to NEW database
    const newConnection = await mongoose.createConnection('mongodb+srv://pattrentalservices:0a0b0c0d@pattrental.6yqdo0s.mongodb.net/?retryWrites=true&w=majority&appName=pattrental');
    const NewCar = newConnection.model('Car', carSchema);
    
    // Get cars from old database
    const cars = await OldCar.find({});
    console.log(`Found ${cars.length} cars in old database`);
    
    // Insert into new database
    if (cars.length > 0) {
      await NewCar.insertMany(cars);
      console.log(`✅ Migrated ${cars.length} cars to new database`);
    }
    
    await oldConnection.close();
    await newConnection.close();
    
  } catch (error) {
    console.error('Migration error:', error);
  }
}

migrateCars();
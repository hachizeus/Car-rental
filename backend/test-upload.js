require('dotenv').config();
const mongoose = require('mongoose');
const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');
const Car = require('./models/Car');

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function testUploadAndFetch() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test ImageKit upload with a sample image
    const sampleImagePath = path.join(__dirname, '../frontend/src/assets/images/logo.png');
    
    if (fs.existsSync(sampleImagePath)) {
      const imageBuffer = fs.readFileSync(sampleImagePath);
      
      const uploadResult = await imagekit.upload({
        file: imageBuffer,
        fileName: 'test-car-image',
        folder: '/cars/images'
      });
      
      console.log('✅ ImageKit upload successful:', uploadResult.url);

      // Create a test car with the uploaded image
      const testCar = new Car({
        title: 'Test Car',
        description: 'This is a test car for upload functionality',
        price_per_day: 5000,
        category: 'economy',
        location: 'Nairobi',
        features: ['GPS', 'AC', 'Bluetooth'],
        images: [{
          url: uploadResult.url,
          is_primary: true
        }]
      });

      await testCar.save();
      console.log('✅ Test car saved to MongoDB:', testCar._id);

      // Fetch the car back
      const fetchedCar = await Car.findById(testCar._id);
      console.log('✅ Car fetched successfully:', {
        id: fetchedCar._id,
        title: fetchedCar.title,
        imageUrl: fetchedCar.images[0]?.url
      });

      // Clean up - delete the test car
      await Car.findByIdAndDelete(testCar._id);
      console.log('✅ Test car deleted');

    } else {
      console.log('⚠️ Sample image not found, testing without image upload');
      
      // Test car creation without image
      const testCar = new Car({
        title: 'Test Car No Image',
        description: 'Test car without image',
        price_per_day: 3000,
        category: 'economy',
        location: 'Nairobi',
        features: ['GPS', 'AC']
      });

      await testCar.save();
      console.log('✅ Test car (no image) saved:', testCar._id);

      const fetchedCar = await Car.findById(testCar._id);
      console.log('✅ Car fetched successfully:', {
        id: fetchedCar._id,
        title: fetchedCar.title
      });

      await Car.findByIdAndDelete(testCar._id);
      console.log('✅ Test car deleted');
    }

    console.log('🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

// Run the test
testUploadAndFetch();
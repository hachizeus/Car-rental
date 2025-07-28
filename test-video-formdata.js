const fs = require('fs');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'https://car-rental-backend-80qi.onrender.com';
const TEST_CREDENTIALS = {
  email: 'pattrentalservices@gmail.com',
  password: '0a0b0c0d'
};

// Create a small test video file
const createTestVideo = () => {
  const mp4Header = Buffer.from([
    0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D,
    0x00, 0x00, 0x02, 0x00, 0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
    0x61, 0x76, 0x63, 0x31, 0x6D, 0x70, 0x34, 0x31
  ]);
  fs.writeFileSync('test-video.mp4', mp4Header);
  return 'test-video.mp4';
};

async function testVideoUpdate() {
  try {
    // Login
    console.log('🔐 Logging in...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_CREDENTIALS)
    });
    
    const { token } = await loginResponse.json();
    console.log('✅ Login successful');
    
    // Get first car
    console.log('🚗 Getting cars...');
    const carsResponse = await fetch(`${API_BASE_URL}/api/cars`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const cars = await carsResponse.json();
    if (cars.length === 0) {
      console.log('❌ No cars found');
      return;
    }
    
    const car = cars[0];
    console.log(`✅ Found car: ${car.title} (ID: ${car._id})`);
    console.log(`📹 Current videos: ${car.videos ? car.videos.length : 0}`);
    
    // Create test video
    const videoPath = createTestVideo();
    console.log('📹 Created test video file');
    
    // Update car with video
    console.log('📤 Updating car with video...');
    
    const form = new FormData();
    
    // Add existing car data (required fields)
    form.append('title', car.title);
    form.append('description', car.description);
    form.append('price_per_day', car.price_per_day.toString());
    form.append('category', car.category);
    form.append('location', car.location);
    form.append('features', car.features ? car.features.join(', ') : '');
    form.append('is_available', car.is_available.toString());
    
    // Add optional fields
    if (car.engine) form.append('engine', car.engine);
    if (car.transmission) form.append('transmission', car.transmission);
    if (car.fuel_type) form.append('fuel_type', car.fuel_type);
    if (car.seats) form.append('seats', car.seats.toString());
    if (car.year) form.append('year', car.year.toString());
    if (car.mileage) form.append('mileage', car.mileage);
    
    // Add video file
    form.append('videos', fs.createReadStream(videoPath), {
      filename: 'test-video.mp4',
      contentType: 'video/mp4'
    });
    
    console.log('📋 FormData prepared with video file');
    
    const updateResponse = await fetch(`${API_BASE_URL}/api/cars/${car._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.log('❌ Update failed:', updateResponse.status, errorText);
      return;
    }
    
    const updatedCar = await updateResponse.json();
    console.log('✅ Car updated successfully');
    console.log(`📹 Videos after update: ${updatedCar.videos ? updatedCar.videos.length : 0}`);
    
    if (updatedCar.videos && updatedCar.videos.length > 0) {
      console.log('📹 Video URLs:');
      updatedCar.videos.forEach((video, index) => {
        console.log(`   Video ${index + 1}: ${video}`);
      });
    } else {
      console.log('❌ No videos found in updated car');
    }
    
    // Clean up
    fs.unlinkSync(videoPath);
    console.log('🧹 Test file cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testVideoUpdate();
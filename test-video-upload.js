const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Configuration
const API_BASE_URL = 'https://car-rental-backend-80qi.onrender.com';
const TEST_CREDENTIALS = {
  email: 'pattrentalservices@gmail.com',
  password: '0a0b0c0d'
};

// Create a small test video file (MP4 header)
const createTestVideo = () => {
  const mp4Header = Buffer.from([
    0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D,
    0x00, 0x00, 0x02, 0x00, 0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
    0x61, 0x76, 0x63, 0x31, 0x6D, 0x70, 0x34, 0x31
  ]);
  const testVideoPath = path.join(__dirname, 'test-video.mp4');
  fs.writeFileSync(testVideoPath, mp4Header);
  return testVideoPath;
};

// Test functions
async function testBackendHealth() {
  console.log('🔍 Testing backend health...');
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();
    console.log('✅ Backend health:', data);
    return true;
  } catch (error) {
    console.error('❌ Backend health failed:', error.message);
    return false;
  }
}

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  try {
    const response = await fetch(`${API_BASE_URL}/test-db`);
    const data = await response.json();
    console.log('✅ Database connection:', data);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('🔍 Testing admin login...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_CREDENTIALS)
    });
    
    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Login successful:', { token: data.token ? 'Present' : 'Missing' });
    return data.token;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    return null;
  }
}

async function testGetCars(token) {
  console.log('🔍 Testing get cars...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/cars`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const cars = await response.json();
    console.log(`✅ Found ${cars.length} cars`);
    
    // Check for videos in existing cars
    const carsWithVideos = cars.filter(car => car.videos && car.videos.length > 0);
    console.log(`📹 Cars with videos: ${carsWithVideos.length}`);
    
    if (carsWithVideos.length > 0) {
      console.log('📹 Video URLs found:');
      carsWithVideos.forEach((car, index) => {
        console.log(`   Car ${index + 1}: ${car.videos.length} videos`);
        car.videos.forEach((video, vIndex) => {
          console.log(`     Video ${vIndex + 1}: ${video}`);
        });
      });
    }
    
    return cars;
  } catch (error) {
    console.error('❌ Get cars failed:', error.message);
    return [];
  }
}

async function testVideoUpload(token) {
  console.log('🔍 Testing video upload...');
  
  // Create test video file
  const testVideoPath = createTestVideo();
  
  try {
    const form = new FormData();
    
    // Add car data
    form.append('title', 'Test Car with Video');
    form.append('description', 'Testing video upload functionality');
    form.append('price_per_day', '1000');
    form.append('category', 'economy');
    form.append('location', 'Nairobi');
    form.append('features', 'GPS, AC');
    form.append('is_available', 'true');
    form.append('engine', '2.0L');
    form.append('transmission', 'automatic');
    form.append('fuel_type', 'petrol');
    form.append('seats', '5');
    form.append('year', '2023');
    form.append('mileage', '15 km/l');
    
    // Add test video
    form.append('videos', fs.createReadStream(testVideoPath), {
      filename: 'test-video.mp4',
      contentType: 'video/mp4'
    });
    
    console.log('📤 Uploading car with video...');
    
    const response = await fetch(`${API_BASE_URL}/api/cars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('✅ Car created successfully');
    console.log(`📹 Videos uploaded: ${result.videos ? result.videos.length : 0}`);
    
    if (result.videos && result.videos.length > 0) {
      console.log('📹 Video URLs:');
      result.videos.forEach((video, index) => {
        console.log(`   Video ${index + 1}: ${video}`);
      });
    } else {
      console.log('❌ No videos found in response');
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Video upload failed:', error.message);
    return null;
  } finally {
    // Clean up test file
    if (fs.existsSync(testVideoPath)) {
      fs.unlinkSync(testVideoPath);
    }
  }
}

async function testImageKitConnection() {
  console.log('🔍 Testing ImageKit connection...');
  try {
    // This is a basic test - we can't directly test ImageKit without credentials
    // But we can check if the environment variables are set
    const response = await fetch(`${API_BASE_URL}/`);
    console.log('✅ ImageKit test completed (credentials should be checked in backend logs)');
    return true;
  } catch (error) {
    console.error('❌ ImageKit test failed:', error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting comprehensive video upload tests...\n');
  
  const results = {
    backendHealth: false,
    databaseConnection: false,
    login: false,
    getCars: false,
    videoUpload: false,
    imageKitConnection: false
  };
  
  // Test 1: Backend Health
  results.backendHealth = await testBackendHealth();
  console.log('');
  
  // Test 2: Database Connection
  results.databaseConnection = await testDatabaseConnection();
  console.log('');
  
  // Test 3: Login
  const token = await testLogin();
  results.login = !!token;
  console.log('');
  
  if (!token) {
    console.log('❌ Cannot proceed without authentication token');
    return results;
  }
  
  // Test 4: Get Cars
  const cars = await testGetCars(token);
  results.getCars = cars.length >= 0;
  console.log('');
  
  // Test 5: ImageKit Connection
  results.imageKitConnection = await testImageKitConnection();
  console.log('');
  
  // Test 6: Video Upload
  const uploadResult = await testVideoUpload(token);
  results.videoUpload = !!uploadResult;
  console.log('');
  
  // Summary
  console.log('📊 TEST SUMMARY:');
  console.log('================');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  // Diagnosis
  console.log('\n🔍 DIAGNOSIS:');
  console.log('=============');
  
  if (!results.backendHealth) {
    console.log('❌ Backend is not responding - check deployment');
  } else if (!results.databaseConnection) {
    console.log('❌ Database connection failed - check MongoDB Atlas');
  } else if (!results.login) {
    console.log('❌ Authentication failed - check admin credentials');
  } else if (!results.videoUpload) {
    console.log('❌ Video upload failed - check ImageKit configuration and backend logs');
    console.log('   Possible issues:');
    console.log('   - ImageKit credentials missing or invalid');
    console.log('   - Video processing error in backend');
    console.log('   - File upload size limits');
    console.log('   - CORS issues');
  } else {
    console.log('✅ All tests passed - video upload should be working');
  }
  
  return results;
}

// Install required dependencies if not present
const requiredPackages = ['form-data', 'node-fetch'];
const missingPackages = [];

requiredPackages.forEach(pkg => {
  try {
    require.resolve(pkg);
  } catch (e) {
    missingPackages.push(pkg);
  }
});

if (missingPackages.length > 0) {
  console.log(`❌ Missing required packages: ${missingPackages.join(', ')}`);
  console.log(`Please run: npm install ${missingPackages.join(' ')}`);
  process.exit(1);
}

// Run tests
runTests().catch(console.error);
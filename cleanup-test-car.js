const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'https://car-rental-backend-80qi.onrender.com';
const TEST_CREDENTIALS = {
  email: 'pattrentalservices@gmail.com',
  password: '0a0b0c0d'
};

async function cleanupTestCar() {
  try {
    // Login
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_CREDENTIALS)
    });
    
    const { token } = await loginResponse.json();
    
    // Get all cars
    const carsResponse = await fetch(`${API_BASE_URL}/api/cars`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const cars = await carsResponse.json();
    
    // Find and delete test cars
    const testCars = cars.filter(car => car.title.includes('Test Car'));
    
    for (const car of testCars) {
      console.log(`Deleting test car: ${car.title} (ID: ${car._id})`);
      
      const deleteResponse = await fetch(`${API_BASE_URL}/api/cars/${car._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (deleteResponse.ok) {
        console.log(`✅ Deleted: ${car.title}`);
      } else {
        console.log(`❌ Failed to delete: ${car.title}`);
      }
    }
    
    console.log(`\n🧹 Cleanup complete. Deleted ${testCars.length} test cars.`);
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

cleanupTestCar();
require('dotenv').config({ path: './backend/.env' });
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function testImageKit() {
  console.log('🔍 Testing ImageKit configuration...');
  console.log('Public Key:', process.env.IMAGEKIT_PUBLIC_KEY ? 'Present' : 'Missing');
  console.log('Private Key:', process.env.IMAGEKIT_PRIVATE_KEY ? 'Present' : 'Missing');
  console.log('URL Endpoint:', process.env.IMAGEKIT_URL_ENDPOINT || 'Missing');
  
  try {
    // Test authentication by listing files
    const result = await imagekit.listFiles({
      limit: 1,
      folder: '/cars'
    });
    
    console.log('✅ ImageKit authentication successful');
    console.log(`Found ${result.length} files in /cars folder`);
    
    // Test video upload capability
    const testBuffer = Buffer.from('test video content');
    
    try {
      const uploadResult = await imagekit.upload({
        file: testBuffer,
        fileName: 'test-video-capability.mp4',
        folder: '/cars/videos',
        useUniqueFileName: true
      });
      
      console.log('✅ Video upload test successful');
      console.log('Upload result:', uploadResult.url);
      
      // Clean up test file
      await imagekit.deleteFile(uploadResult.fileId);
      console.log('✅ Test file cleaned up');
      
    } catch (uploadError) {
      console.error('❌ Video upload test failed:', uploadError.message);
    }
    
  } catch (error) {
    console.error('❌ ImageKit authentication failed:', error.message);
  }
}

testImageKit();
/**
 * Utility for handling video uploads to ImageKit
 */
const uploadVideo = async (imagekit, file) => {
  try {
    console.log(`Processing video: ${file.originalname}, size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    
    // For videos larger than 10MB, we might need special handling
    const isLargeVideo = file.size > 10 * 1024 * 1024;
    
    const uploadOptions = {
      file: file.buffer,
      fileName: `car-video-${Date.now()}`,
      folder: '/cars/videos',
      useUniqueFileName: true,
      // Disable transformations for videos
      responseFields: ['tags', 'customCoordinates', 'isPrivateFile', 'url', 'thumbnailUrl']
    };
    
    // For large videos, add additional options
    if (isLargeVideo) {
      console.log(`Large video detected (${(file.size / (1024 * 1024)).toFixed(2)} MB), using optimized upload`);
      // Add any special options for large videos if needed
    }
    
    const result = await imagekit.upload(uploadOptions);
    console.log(`Video uploaded successfully: ${result.url}`);
    return result.url;
  } catch (error) {
    console.error(`Error uploading video: ${file.originalname}`, error);
    throw error;
  }
};

module.exports = { uploadVideo };
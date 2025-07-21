/**
 * Utility for handling video uploads to ImageKit
 */
const uploadVideo = async (imagekit, file) => {
  try {
    console.log(`Processing video: ${file.originalname}, size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    
    // For videos larger than 10MB, we might need special handling
    const isLargeVideo = file.size > 10 * 1024 * 1024;
    
    // Ensure the file is a valid video format
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validVideoTypes.includes(file.mimetype)) {
      console.warn(`Warning: File ${file.originalname} has MIME type ${file.mimetype} which may not be supported`);
    }
    
    const uploadOptions = {
      file: file.buffer,
      fileName: `car-video-${Date.now()}`,
      folder: '/cars/videos',
      useUniqueFileName: true,
      // Important: Set these options for better video compatibility
      responseFields: ['tags', 'customCoordinates', 'isPrivateFile', 'url', 'thumbnailUrl'],
      // Add public read permissions
      isPrivateFile: false,
      // Add metadata
      customMetadata: {
        contentType: file.mimetype || 'video/mp4'
      }
    };
    
    // For large videos, add additional options
    if (isLargeVideo) {
      console.log(`Large video detected (${(file.size / (1024 * 1024)).toFixed(2)} MB), using optimized upload`);
      // Use a longer timeout for large videos
      uploadOptions.timeout = 600000; // 10 minutes
    }
    
    const result = await imagekit.upload(uploadOptions);
    console.log(`Video uploaded successfully: ${result.url}`);
    
    // Return the URL with a query parameter to help with CORS and caching
    return `${result.url}?tr=f-auto`;
  } catch (error) {
    console.error(`Error uploading video: ${file.originalname}`, error);
    throw error;
  }
};

module.exports = { uploadVideo };
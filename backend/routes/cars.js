const express = require('express');
const multer = require('multer');
const ImageKit = require('imagekit');
const Car = require('../models/Car');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new car (admin only)
router.post('/', auth, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const carData = {
      ...req.body,
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : [],
      price_per_day: parseFloat(req.body.price_per_day),
      seats: parseInt(req.body.seats) || 5,
      year: parseInt(req.body.year),
      is_available: req.body.is_available === 'true'
    };

    const car = new Car(carData);
    
    // Upload images
    if (req.files.images) {
      for (let i = 0; i < req.files.images.length; i++) {
        const file = req.files.images[i];
        const result = await imagekit.upload({
          file: file.buffer,
          fileName: `car-${Date.now()}-${i}`,
          folder: '/cars/images'
        });
        car.images.push({
          url: result.url,
          is_primary: i === 0
        });
      }
    }

    // Upload videos
    if (req.files.videos) {
      for (const file of req.files.videos) {
        try {
          console.log(`Uploading video: ${file.originalname}, size: ${file.size} bytes`);
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: `car-video-${Date.now()}`,
            folder: '/cars/videos',
            useUniqueFileName: true,
            // Remove transformations that might be causing issues
            // Let ImageKit handle the video as is
          });
          console.log(`Video uploaded successfully: ${result.url}`);
          car.videos.push(result.url);
        } catch (error) {
          console.error(`Error uploading video: ${file.originalname}`, error);
          // Continue with other videos even if one fails
        }
      }
    }

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update car (admin only)
router.put('/:id', auth, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    const updateData = {
      ...req.body,
      features: req.body.features ? req.body.features.split(',').map(f => f.trim()) : car.features,
      price_per_day: req.body.price_per_day ? parseFloat(req.body.price_per_day) : car.price_per_day,
      seats: req.body.seats ? parseInt(req.body.seats) : car.seats,
      year: req.body.year ? parseInt(req.body.year) : car.year,
      is_available: req.body.is_available !== undefined ? req.body.is_available === 'true' : car.is_available
    };

    Object.assign(car, updateData);

    // Add new images
    if (req.files.images) {
      for (let i = 0; i < req.files.images.length; i++) {
        const file = req.files.images[i];
        const result = await imagekit.upload({
          file: file.buffer,
          fileName: `car-${Date.now()}-${i}`,
          folder: '/cars/images'
        });
        car.images.push({
          url: result.url,
          is_primary: car.images.length === 0 && i === 0
        });
      }
    }

    // Add new videos
    if (req.files.videos) {
      for (const file of req.files.videos) {
        try {
          console.log(`Updating car: ${car._id}, uploading video: ${file.originalname}, size: ${file.size} bytes`);
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: `car-video-${Date.now()}`,
            folder: '/cars/videos',
            useUniqueFileName: true
          });
          console.log(`Video uploaded successfully: ${result.url}`);
          car.videos.push(result.url);
        } catch (error) {
          console.error(`Error uploading video: ${file.originalname}`, error);
          // Continue with other videos even if one fails
        }
      }
    }

    await car.save();
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete car (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image from car
router.delete('/:id/image/:imageIndex', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    
    const imageIndex = parseInt(req.params.imageIndex);
    if (imageIndex >= 0 && imageIndex < car.images.length) {
      car.images.splice(imageIndex, 1);
      await car.save();
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid image index' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete video from car
router.delete('/:id/video/:videoIndex', auth, async (req, res) => {
  try {
    // Validate parameters
    if (!req.params.id || !req.params.videoIndex) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    
    // Ensure videoIndex is a valid number
    const videoIndex = parseInt(req.params.videoIndex);
    if (isNaN(videoIndex)) {
      return res.status(400).json({ error: 'Video index must be a number' });
    }
    
    // Check if videos array exists and has the specified index
    if (!Array.isArray(car.videos)) {
      car.videos = [];
      await car.save();
      return res.status(400).json({ error: 'No videos found for this car' });
    }
    
    if (videoIndex >= 0 && videoIndex < car.videos.length) {
      // Remove the video at the specified index
      car.videos.splice(videoIndex, 1);
      await car.save();
      res.json({ message: 'Video deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid video index' });
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: error.message || 'Failed to delete video' });
  }
});

module.exports = router;
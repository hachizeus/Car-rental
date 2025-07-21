const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price_per_day: { type: Number, required: true },
  category: { type: String, required: true, enum: ['economy', 'luxury', 'suv'] },
  location: { type: String, required: true },
  features: [String],
  is_available: { type: Boolean, default: true },
  engine: String,
  transmission: { type: String, enum: ['automatic', 'manual'], default: 'automatic' },
  fuel_type: { type: String, enum: ['petrol', 'diesel', 'hybrid', 'electric'], default: 'petrol' },
  seats: { type: Number, default: 5 },
  year: Number,
  mileage: String,
  images: [{
    url: String,
    is_primary: { type: Boolean, default: false }
  }],
  videos: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
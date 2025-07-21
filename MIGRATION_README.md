# Migration from Supabase to MongoDB + ImageKit

This document outlines the complete migration from Supabase to MongoDB + ImageKit for the car rental application.

## Architecture Changes

### Before (Supabase)
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **API**: Direct Supabase client calls

### After (MongoDB + ImageKit)
- **Database**: MongoDB Atlas
- **Authentication**: JWT with bcrypt
- **File Storage**: ImageKit
- **API**: Express.js REST API

## Database Schema Migration

### MongoDB Schema (Car Model)
```javascript
{
  title: String,
  description: String,
  price_per_day: Number,
  category: String (enum: ['economy', 'luxury', 'suv']),
  location: String,
  features: [String],
  is_available: Boolean,
  engine: String,
  transmission: String (enum: ['automatic', 'manual']),
  fuel_type: String (enum: ['petrol', 'diesel', 'hybrid', 'electric']),
  seats: Number,
  year: Number,
  mileage: String,
  images: [{
    url: String,
    is_primary: Boolean
  }],
  videos: [String],
  timestamps: true
}
```

### User Schema
```javascript
{
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin']),
  timestamps: true
}
```

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create `.env` file with:
```
MONGODB_URI=mongodb+srv://anziaelectronics:0a0b0c0d@anziaelectronics.vfsc5md.mongodb.net/?retryWrites=true&w=majority&appName=anziaelectronics
IMAGEKIT_PUBLIC_KEY=public_ahoxvdF2fShMnKvheyP8TQrAKhE=
IMAGEKIT_PRIVATE_KEY=private_2giGXPBneW+SEkkpeZIG7djjhqw=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/q5jukn457
JWT_SECRET=cd57c4c40415b68b920360bc1537f5d026ea58496733d8f37a948b12794e82c30e5b2a809f87a6c6ccc50f830aacedbe2b8922306ba90b322b17f41b3e03fc6c
PORT=5000
```

### 3. Create Admin User
```bash
node create-admin.js
```
**Admin Credentials:**
- Email: admin@pattrentals.com
- Password: admin123

### 4. Test Setup
```bash
node test-upload.js
```

### 5. Start Backend Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/create-admin` - Create admin user

### Cars
- `GET /api/cars` - Get all cars (public)
- `GET /api/cars/:id` - Get car by ID (public)
- `POST /api/cars` - Add new car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

## Frontend Changes

### New API Client (`frontend/src/lib/api.ts`)
- Replaces Supabase client
- Handles HTTP requests to Express API
- Updated Car interface with MongoDB structure

### Updated Components
- **Fleet.tsx**: Uses new API for fetching cars
- **CarDetails.tsx**: Updated to use new image structure

### Admin Panel Changes

### New API Client (`admin/src/lib/api.ts`)
- JWT authentication
- FormData for file uploads
- CRUD operations for cars

### Updated Components
- **Login.tsx**: JWT authentication
- **AddCar.tsx**: FormData upload to Express API
- **CarList.tsx**: Uses new API structure

## Key Differences

### Image Handling
**Before (Supabase):**
```javascript
car_images: [{
  image_url: string,
  is_primary: boolean
}]
```

**After (MongoDB):**
```javascript
images: [{
  url: string,
  is_primary: boolean
}]
```

### Authentication
**Before:** Supabase Auth with RLS
**After:** JWT tokens with middleware protection

### File Upload
**Before:** Direct Supabase Storage upload
**After:** Multer + ImageKit upload via API

## Testing

### Upload & Fetch Test
```bash
cd backend
node test-upload.js
```

This test:
1. Connects to MongoDB
2. Uploads test image to ImageKit
3. Creates car record with image
4. Fetches car back
5. Cleans up test data

### Manual Testing Flow
1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Start admin: `npm run dev`
4. Login to admin with credentials above
5. Add a car with images/videos
6. Verify car appears in frontend

## Migration Benefits

1. **Cost Efficiency**: MongoDB Atlas + ImageKit potentially more cost-effective
2. **Flexibility**: Full control over API and data structure
3. **Scalability**: Express.js can be easily scaled and customized
4. **File Management**: ImageKit provides better image optimization and CDN

## Security Considerations

1. JWT tokens expire in 24 hours
2. Admin routes protected by authentication middleware
3. Password hashing with bcrypt
4. CORS configured for frontend domains
5. File upload size limits implemented

## Deployment Notes

1. Update frontend/admin API_BASE_URL for production
2. Set production environment variables
3. Configure CORS for production domains
4. Set up MongoDB Atlas IP whitelist
5. Configure ImageKit for production usage
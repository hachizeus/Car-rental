# Deploy Backend to Render

## Quick Deploy Steps

1. **Push to GitHub** (already done)
2. **Go to Render Dashboard**: https://render.com
3. **Create New Web Service**
4. **Connect GitHub repo**: `hachizeus/Car-rental`
5. **Configure deployment**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Environment Variables (Add in Render Dashboard)

```
MONGODB_URI=mongodb+srv://anziaelectronics:0a0b0c0d@anziaelectronics.vfsc5md.mongodb.net/?retryWrites=true&w=majority&appName=anziaelectronics
IMAGEKIT_PUBLIC_KEY=public_ahoxvdF2fShMnKvheyP8TQrAKhE=
IMAGEKIT_PRIVATE_KEY=private_2giGXPBneW+SEkkpeZIG7djjhqw=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/q5jukn457
JWT_SECRET=cd57c4c40415b68b920360bc1537f5d026ea58496733d8f37a948b12794e82c30e5b2a809f87a6c6ccc50f830aacedbe2b8922306ba90b322b17f41b3e03fc6c
NODE_ENV=production
```

## After Deployment

1. **Get your Render URL** (e.g., `https://your-app.onrender.com`)
2. **Update frontend API_BASE_URL**:
   ```typescript
   const API_BASE_URL = 'https://your-app.onrender.com/api';
   ```
3. **Update admin API_BASE_URL** similarly
4. **Test endpoints**:
   - GET `https://your-app.onrender.com/api/cars`
   - POST `https://your-app.onrender.com/api/auth/login`

## Create Admin User on Production

After deployment, create admin user:
```bash
# SSH into Render or use their console
node create-admin.js
```

Or use the API endpoint:
```bash
curl -X POST https://your-app.onrender.com/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pattrentals.com","password":"admin123"}'
```
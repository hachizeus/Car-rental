# Render Deployment Guide

## Quick Deploy

1. **Connect GitHub Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `hachizeus/Car-rental`

2. **Deploy Frontend**
   - Name: `car-rental-frontend`
   - Environment: `Static Site`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL`: `https://jvfmjgpqqaumcffmhedw.supabase.co`
     - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Zm1qZ3BxcWF1bWNmZm1oZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTI1NTAsImV4cCI6MjA2Njg2ODU1MH0.gl1ounnNH5FmvhPY5bmfUrx5yPuJG6XSELmHb_Mzl7Y`

3. **Deploy Admin Panel**
   - Name: `car-rental-admin`
   - Environment: `Static Site`
   - Build Command: `cd admin && npm install && npm run build`
   - Publish Directory: `admin/dist`
   - Add same Environment Variables as above

## Alternative: Blueprint Deployment

Use the included `render.yaml` file for automatic deployment of both services.

## Post-Deployment

- Frontend URL: Will be provided by Render
- Admin URL: Will be provided by Render
- Both sites will have WhatsApp integration working
- No booking system - direct WhatsApp contact

## Features Deployed

✅ Car browsing and filtering
✅ Car details with images/videos
✅ WhatsApp integration (+254 720 813111)
✅ Admin panel for car management
✅ Responsive design
✅ No appointment system
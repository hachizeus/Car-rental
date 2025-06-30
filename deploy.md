# Deployment Guide

## Prerequisites
- Supabase project set up with database and storage
- Domain names (optional)
- Hosting accounts (Vercel, Netlify, etc.)

## Step 1: Database Setup
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Run all commands from `database-setup.sql`
4. Create storage buckets:
   - `car-images` (public)
   - `car-videos` (public)

## Step 2: Frontend Deployment (Vercel)

### Option A: Vercel CLI
```bash
cd frontend
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Step 3: Admin Panel Deployment

### Option A: Separate Vercel Project
```bash
cd admin
vercel
```

### Option B: Subdomain Setup
Deploy to `admin.yourdomain.com` with same environment variables

## Step 4: Environment Variables
Set these in your deployment platform:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 5: Domain Configuration (Optional)
- Frontend: `yourdomain.com`
- Admin: `admin.yourdomain.com`

## Step 6: SSL & Security
- Enable HTTPS (automatic with Vercel/Netlify)
- Configure CORS in Supabase if needed
- Set up proper RLS policies

## Alternative Hosting Options

### Netlify
```bash
cd frontend
npm run build
# Drag and drop dist folder to Netlify
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### Traditional Hosting
```bash
npm run build
# Upload dist folder contents to your web server
```

## Post-Deployment Checklist
- [ ] Test car listing functionality
- [ ] Test image uploads in admin
- [ ] Test booking form submission
- [ ] Verify responsive design on mobile
- [ ] Check all navigation links
- [ ] Test search and filter functionality
- [ ] Verify admin panel access

## Monitoring & Maintenance
- Set up error tracking (Sentry, LogRocket)
- Monitor Supabase usage and limits
- Regular database backups
- Update dependencies monthly
- Monitor site performance

## Troubleshooting

### Common Issues
1. **Images not loading**: Check storage bucket permissions
2. **CORS errors**: Configure allowed origins in Supabase
3. **Build failures**: Check environment variables
4. **Database errors**: Verify RLS policies

### Debug Steps
1. Check browser console for errors
2. Verify Supabase connection
3. Test API endpoints manually
4. Check network requests in DevTools
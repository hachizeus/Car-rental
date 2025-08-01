# HostAfrica Hosting Guide

## Files Added for Hosting

### Frontend (pattrentals.com)
- `.htaccess` - SPA routing, compression, caching, security
- `robots.txt` - SEO optimization
- `sitemap.xml` - Search engine indexing
- `404.html` - Custom error page
- `.well-known/security.txt` - Security contact info

### Admin (admin.pattrentals.com)
- `.htaccess` - SPA routing, security, admin protection
- `robots.txt` - Blocks search engines
- `404.html` - Custom admin error page
- `.well-known/security.txt` - Security contact info

## Deployment Steps

### 1. Build Projects
```bash
# Frontend
cd frontend
npm run build

# Admin
cd admin
npm run build
```

### 2. Upload to HostAfrica
- Upload `frontend/dist/*` to main domain folder
- Upload `admin/dist/*` to subdomain folder

### 3. Domain Setup
- Main domain: `pattrentals.com` → frontend
- Subdomain: `admin.pattrentals.com` → admin

### 4. Environment Variables
Update API URLs in built files if needed:
- Frontend: Update API_BASE_URL to your backend URL
- Admin: Update VITE_API_BASE_URL to your backend URL

### 5. SSL Certificate
Enable SSL/HTTPS in HostAfrica cPanel for both domains.

### 6. Backend Hosting
Deploy backend to a service like:
- Render.com (recommended)
- Railway.app
- Heroku

Update CORS settings in backend to allow your domains:
```javascript
const allowedOrigins = [
  'https://pattrentals.com',
  'https://admin.pattrentals.com'
];
```

## Performance Optimizations Included
- Gzip compression
- Static asset caching (1 year)
- Image optimization with ImageKit
- Lazy loading
- WebP format support

## Security Features
- XSS protection headers
- Content type sniffing protection
- Frame options (clickjacking protection)
- Admin panel blocked from search engines
- Environment file protection
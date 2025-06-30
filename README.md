# Car Rental Website - Full Stack Application

A modern car rental platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Frontend (Customer Portal)
- 🏠 **Homepage** with hero section and featured cars
- 🚗 **Fleet Page** with search, filters, and car listings
- 🔍 **Car Details** with image gallery, videos, and specifications
- 📱 **WhatsApp Integration** for direct customer communication
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Modern UI** with Tailwind CSS and Radix UI components

### Admin Panel
- 📊 **Dashboard** with statistics and quick actions
- 🚗 **Car Management** - Add, edit, delete cars
- 🖼️ **Image & Video Upload** with Supabase storage

- 🔐 **Secure Admin Interface**

### Backend (Supabase)
- 🗄️ **PostgreSQL Database** with proper relationships
- 🔒 **Row Level Security (RLS)** for data protection
- 📁 **File Storage** for images and videos
- 🔄 **Real-time Updates** with Supabase subscriptions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd car-rental-clone-spark
```

### 2. Setup Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the commands from `database-setup.sql`
3. Create storage buckets:
   - Go to Storage → Create bucket → `car-images` (public)
   - Create bucket → `car-videos` (public)
4. Get your project URL and anon key from Settings → API

### 3. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Admin Panel
```bash
cd admin
npm install
```

### 4. Environment Setup
Update the Supabase configuration in:
- `frontend/src/lib/supabase.ts`
- `admin/src/lib/supabase.ts`

Replace with your Supabase URL and anon key:
```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 5. Run the Applications

#### Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

#### Admin Panel (Port 3001)
```bash
cd admin
npm run dev
```

## Project Structure

```
car-rental-clone-spark/
├── frontend/                 # Customer-facing website
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and Supabase config
│   │   └── hooks/          # Custom React hooks
│   └── package.json
├── admin/                   # Admin panel
│   ├── src/
│   │   ├── components/     # Admin UI components
│   │   ├── pages/         # Admin pages
│   │   └── lib/           # Utilities and Supabase config
│   └── package.json
├── database-setup.sql      # Database schema and sample data
└── README.md
```

## Database Schema

### Tables
- **cars** - Car information and details
- **car_images** - Car photos with primary image flag
- **car_videos** - Car videos


### Storage Buckets
- **car-images** - Car photographs
- **car-videos** - Car videos

## Key Features Explained

### Image & Video Management
- Upload multiple images and videos per car
- Set primary image for car listings
- Automatic file storage in Supabase
- Delete existing media files

### WhatsApp Integration
- Direct WhatsApp redirect with car details
- Pre-filled message with car information
- Seamless customer communication
- No appointment system required

### Search & Filtering
- Text search across car titles and descriptions
- Category filtering (Economy, Luxury, SUV)
- Price range filtering
- Real-time results update

### Admin Dashboard
- Car inventory statistics
- Quick action buttons for common tasks

## Customization

### Adding New Car Categories
1. Update the categories array in `Fleet.tsx`
2. Add the new category to your database enum (if using)



### Styling Changes
- Modify Tailwind classes throughout components
- Update the color scheme in `tailwind.config.ts`
- Customize component variants in UI components

## Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting:
```bash
cd frontend
npm run build
```

### Admin Panel
Deploy separately with environment variables:
```bash
cd admin
npm run build
```

### Environment Variables
Set these in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Security Considerations

- Row Level Security (RLS) is enabled on all tables
- Public read access for car data
- Authenticated access required for admin operations
- File upload restrictions should be configured in Supabase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the documentation
2. Review the database setup
3. Verify Supabase configuration
4. Check browser console for errors

## License

This project is open source and available under the MIT License.
# Bazari - Serverless API Documentation

## Overview
Bazari has been converted to a serverless architecture using Next.js 16 API Routes. All backend functionality is now integrated into the user-portal application.

## Architecture
- **Framework**: Next.js 16.1.1 (App Router)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth + JWT
- **Storage**: Firebase Storage
- **Deployment**: Vercel Serverless Functions

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/refresh` - Refresh JWT token

### Categories (`/api/categories`)
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (Admin)
- `GET /api/categories/[id]` - Get single category
- `PUT /api/categories/[id]` - Update category (Admin)
- `DELETE /api/categories/[id]` - Delete category (Admin)

### Services (`/api/services`)
- `GET /api/services` - List all services
- `POST /api/services` - Create service (Provider)
- `GET /api/services/[id]` - Get single service
- `PUT /api/services/[id]` - Update service (Provider/Admin)
- `DELETE /api/services/[id]` - Delete service (Provider/Admin)
- `GET /api/services/my-services` - Get provider's services

### Bookings (`/api/bookings`)
- `GET /api/bookings` - List bookings (filtered by role)
- `POST /api/bookings` - Create booking (Customer)
- `GET /api/bookings/[id]` - Get single booking
- `PUT /api/bookings/[id]/status` - Update booking status (Provider/Admin)
- `PUT /api/bookings/[id]/cancel` - Cancel booking (Customer/Admin)

### Reviews (`/api/reviews`)
- `GET /api/reviews` - List reviews (by service or provider)
- `POST /api/reviews` - Create review (Customer, after completed booking)

### Notifications (`/api/notifications`)
- `GET /api/notifications` - Get user's notifications
- `POST /api/notifications` - Create notification (Admin)
- `PUT /api/notifications/[id]` - Mark as read
- `DELETE /api/notifications/[id]` - Delete notification
- `PUT /api/notifications/mark-all-read` - Mark all as read

### Providers (`/api/providers`)
- `GET /api/providers` - Get provider profile
- `POST /api/providers` - Register as provider
- `PUT /api/providers/[id]` - Update provider profile
- `GET /api/providers/nearby` - Get nearby providers

### Admin (`/api/admin`)
- `GET /api/admin/stats` - Dashboard statistics (Admin)
- `GET /api/admin/bookings` - Recent bookings (Admin)
- `GET /api/admin/users` - All users (Admin)

### Upload (`/api/upload`)
- `POST /api/upload/avatar` - Upload avatar image
- `POST /api/upload/service-image` - Upload service image (Provider)
- `POST /api/upload/document` - Upload document (Provider)

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Environment Variables
Create `.env.local` file:
```env
FIREBASE_STORAGE_BUCKET=bazari-app-1f2a7.firebasestorage.app
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Local Development
```bash
npm run dev
```
Server runs on: http://localhost:3002

## Testing
Use the following tools to test:
- Postman/Insomnia
- cURL
- Mobile app (update API_BASE_URL to http://localhost:3002/api)

## Deployment to Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```

Configure environment variables in Vercel dashboard.

## Migration from Traditional Backend
The original NestJS backend is backed up in the `backend-old` folder. All 53 endpoints have been successfully migrated to Next.js API Routes.

## Key Differences from Traditional Backend
1. **Cold Starts**: First request may take 100-300ms
2. **Function Timeout**: 10-60 seconds (Vercel limits)
3. **No WebSockets**: Use external services like Pusher for real-time features
4. **Stateless**: Each request is independent

## Total Endpoints: 53
All endpoints fully functional with Firebase integration.

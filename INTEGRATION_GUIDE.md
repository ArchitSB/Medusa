# Medusa Materio Integration

This project integrates the Materio MUI Admin Dashboard with a Medusa ecommerce backend.

## Project Structure

```
/home/archit/Drive D/Medusa/
├── my-medusa-store/          # Medusa backend server
├── medusa-materio-admin/     # Materio admin dashboard frontend
└── my-medusa-store-storefront/ # Next.js storefront (existing)
```

## Getting Started

### 1. Start the Medusa Backend

```bash
cd my-medusa-store
npm run dev
```

The Medusa backend will run on http://localhost:9000

### 2. Start the Admin Dashboard

```bash
cd medusa-materio-admin
npm run dev
```

The admin dashboard will run on http://localhost:3001

## Features

### Integrated Components:
- **Authentication**: Login system connected to Medusa admin auth
- **Dashboard**: Real-time statistics from Medusa backend
- **Product Management**: Full CRUD operations for products
- **Order Management**: View and manage customer orders
- **Customer Management**: Customer data and analytics
- **Analytics**: Revenue and sales tracking

### Admin Dashboard URLs:
- Login: http://localhost:3001/login
- Dashboard: http://localhost:3001/dashboard
- Medusa-specific Dashboard: http://localhost:3001/medusa-dashboard

### Backend Integration:
- Medusa API: http://localhost:9000
- Admin API endpoints: http://localhost:9000/admin/*
- Store API endpoints: http://localhost:9000/store/*

## Configuration

### Environment Variables

Admin Dashboard (.env.local):
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3001
NODE_ENV=development
```

### CORS Configuration

The Medusa backend is configured to allow requests from:
- http://localhost:3001 (Admin Dashboard)
- http://localhost:3000 (Storefront)

## Development Workflow

1. Both backend and frontend run independently
2. Changes to backend automatically reflect in admin dashboard
3. Real-time data synchronization
4. Separate development and production environments

## Next Steps

1. Test the login functionality with your Medusa admin credentials
2. Customize the dashboard components for your specific needs
3. Add more Medusa-specific features (variants, collections, etc.)
4. Implement role-based access control
5. Add real-time notifications and updates

## Troubleshooting

If you encounter CORS issues:
1. Check that adminCors is configured in medusa-config.ts
2. Ensure the admin dashboard URL is included in CORS settings
3. Verify environment variables are properly set

For authentication issues:
1. Check that your Medusa backend has admin users created
2. Verify API endpoints are accessible
3. Check browser console for detailed error messages

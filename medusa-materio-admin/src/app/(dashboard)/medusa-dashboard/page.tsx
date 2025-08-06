// src/app/(dashboard)/medusa-dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material'
import CardStatVertical from '@components/card-statistics/Vertical'
import { analyticsAPI, productsAPI, ordersAPI, customersAPI } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  revenue: number
}

const MedusaDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const dashboardStats = await analyticsAPI.getDashboardStats()
      setStats(dashboardStats)
    } catch (err: any) {
      setError('Failed to fetch dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">Please log in to access the dashboard</Typography>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Medusa Store Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Welcome to your integrated Medusa admin dashboard
        </Typography>
      </Grid>

      {/* Key Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <CardStatVertical
          title='Total Products'
          stats={stats?.totalProducts?.toString() || '0'}
          avatarIcon='ri-shopping-bag-3-line'
          avatarColor='primary'
          subtitle='Active Products'
          trendNumber='12%'
          trend='positive'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CardStatVertical
          title='Total Orders'
          stats={stats?.totalOrders?.toString() || '0'}
          avatarIcon='ri-shopping-cart-line'
          avatarColor='success'
          subtitle='All Time Orders'
          trendNumber='8%'
          trend='positive'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CardStatVertical
          title='Total Customers'
          stats={stats?.totalCustomers?.toString() || '0'}
          avatarIcon='ri-user-3-line'
          avatarColor='warning'
          subtitle='Registered Users'
          trendNumber='15%'
          trend='positive'
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CardStatVertical
          title='Total Revenue'
          stats={`$${((stats?.revenue || 0) / 100).toFixed(2)}`}
          avatarIcon='ri-money-dollar-circle-line'
          avatarColor='info'
          subtitle='All Time Revenue'
          trendNumber='23%'
          trend='positive'
        />
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                • Manage Products: View, add, edit, and organize your product catalog
              </Typography>
              <Typography variant="body2">
                • Process Orders: Handle customer orders and fulfillment
              </Typography>
              <Typography variant="body2">
                • Customer Management: View customer details and order history
              </Typography>
              <Typography variant="body2">
                • Analytics: Track sales performance and business metrics
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* System Status */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant="body2">Medusa Backend: Connected</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant="body2">Database: Online</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant="body2">Admin UI: Active</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                <Typography variant="body2">Payment Gateway: Configuration Required</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MedusaDashboard

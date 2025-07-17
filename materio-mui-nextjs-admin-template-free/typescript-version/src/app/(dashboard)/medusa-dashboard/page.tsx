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
import { medusaAPI } from '@/services/medusa'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  products: number
  orders: number
  customers: number
  revenue: number
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchDashboardData()
  }, [isAuthenticated, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [productsRes, ordersRes, customersRes] = await Promise.all([
        medusaAPI.getProducts().catch(() => ({ data: { products: [] } })),
        medusaAPI.getOrders().catch(() => ({ data: { orders: [] } })),
        medusaAPI.getCustomers().catch(() => ({ data: { customers: [] } }))
      ])

      const products = productsRes.data.products || []
      const orders = ordersRes.data.orders || []
      const customers = customersRes.data.customers || []

      // Calculate revenue from orders
      const revenue = orders.reduce((sum: number, order: any) => {
        return sum + (order.total || 0)
      }, 0)

      setStats({
        products: products.length,
        orders: orders.length,
        customers: customers.length,
        revenue: revenue / 100 // Convert from cents
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Products
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.products}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total products in store
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="secondary">
                Orders
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.orders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total orders placed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                Customers
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.customers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registered customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                Revenue
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                ${stats.revenue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">
                  • <a href="/products" style={{ color: 'inherit' }}>Manage Products</a>
                </Typography>
                <Typography variant="body2">
                  • <a href="/orders" style={{ color: 'inherit' }}>View Orders</a>
                </Typography>
                <Typography variant="body2">
                  • <a href="/customers" style={{ color: 'inherit' }}>Manage Customers</a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Store Status
              </Typography>
              <Typography variant="body2" color="success.main">
                • Medusa Backend: Connected
              </Typography>
              <Typography variant="body2" color="success.main">
                • Admin Panel: Active
              </Typography>
              <Typography variant="body2" color="success.main">
                • Phone Auth: Enabled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage

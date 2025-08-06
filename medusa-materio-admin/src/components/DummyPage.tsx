// src/components/DummyPage.tsx
'use client'

import { Card, CardContent, Typography, Box } from '@mui/material'

interface DummyPageProps {
  title: string
  description?: string
  icon?: string
}

const DummyPage = ({ title, description, icon }: DummyPageProps) => {
  return (
    <Box sx={{ p: 4 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          {icon && (
            <Box sx={{ mb: 3 }}>
              <i className={`${icon} text-6xl text-primary`} />
            </Box>
          )}
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description || `This is the ${title} page. Content will be implemented soon.`}
          </Typography>
          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              🚧 Under Development
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DummyPage

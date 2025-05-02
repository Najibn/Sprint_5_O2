import { useEffect, useState } from 'react';

import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CircularProgress 
} from '@mui/material';

import { 
  People as PeopleIcon,
  ShoppingBag as ProductsIcon,
  Build as MaintenanceIcon
} from '@mui/icons-material';

import { getUsers, getProducts, getMaintenanceRecords } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    maintenanceRecords: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, products, maintenanceRecords] = await Promise.all([
          getUsers(),
          getProducts(),
          getMaintenanceRecords()
        ]);
        
        setStats({
          users: users.length,
          products: products.length,
          maintenanceRecords: maintenanceRecords.length,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4">
              {stats.loading ? <CircularProgress size={24} /> : value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              color: 'white',
              borderRadius: '50%',
              width: 56,
              height: 56,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Users" 
            value={stats.users} 
            icon={<PeopleIcon fontSize="large" />} 
            color="#1976d2" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Products" 
            value={stats.products} 
            icon={<ProductsIcon fontSize="large" />} 
            color="#4caf50" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Maintenance Records" 
            value={stats.maintenanceRecords} 
            icon={<MaintenanceIcon fontSize="large" />} 
            color="#f44336" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
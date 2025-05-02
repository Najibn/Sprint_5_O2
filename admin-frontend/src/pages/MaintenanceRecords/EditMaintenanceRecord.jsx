import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { getMaintenanceRecords, updateMaintenanceRecord } from '../../api/maintenanceRecords';
import { getProducts, getUsers } from '../../api';

const EditMaintenanceRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_id: '',
    technician_id: '',
    maintenance_date: new Date(),
    status: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [records, productList, userList] = await Promise.all([
          getMaintenanceRecords(),
          getProducts(),
          getUsers()
        ]);
        
        const record = records.find(r => r.id === parseInt(id));
        if (record) {
          setFormData({
            product_id: record.product_id,
            technician_id: record.technician_id,
            maintenance_date: new Date(record.maintenance_date),
            status: record.status,
            notes: record.notes
          });
        }
        
        setProducts(productList);
        setTechnicians(userList.filter(user => user.role === 'technician'));
      } catch (err) {
        setError('Error fetching maintenance record data');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      maintenance_date: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMaintenanceRecord(id, {
        ...formData,
        maintenance_date: formData.maintenance_date.toISOString().split('T')[0]
      });
      navigate('/maintenance-records');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating maintenance record');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Maintenance Record
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Product</InputLabel>
                <Select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  label="Product"
                  required
                >
                  {products.map(product => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} (SN: {product.serial_number})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Technician</InputLabel>
                <Select
                  name="technician_id"
                  value={formData.technician_id}
                  onChange={handleChange}
                  label="Technician"
                  required
                >
                  {technicians.map(tech => (
                    <MenuItem key={tech.id} value={tech.id}>
                      {tech.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Maintenance Date"
                value={formData.maintenance_date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                  required
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                fullWidth
                margin="normal"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{ mr: 2 }}
            >
              Update
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => navigate('/maintenance-records')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditMaintenanceRecord;
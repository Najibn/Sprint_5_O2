import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Container,
  CircularProgress
} from '@mui/material';
import ProductForm from '../../components/Products/ProductForm';
import { createProduct } from '../../api/products';
import { getUsers } from '../../api/users';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    name: 'Fire Extinguisher',
    type: 'water',
    type_capacity: '',
    serial_number: '',
    status: 'Active',
    location: '',
    assigned_to: ''
  });
  const [error, setError] = useState('');
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setCustomers(users.filter(u => u.role === 'customer'));
        setTechnicians(users.filter(u => u.role === 'technician'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating product');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Product
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <ProductForm 
          formData={formData} 
          onChange={handleChange}
          customers={customers}
          technicians={technicians}
        />
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            sx={{ mr: 2 }}
          >
            Create
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/products')}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateProduct;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Container,
  CircularProgress
} from '@mui/material';
import ProductForm from '../../components/Products/ProductForm';
import { getProduct, updateProduct } from '../../api/products';
import { getUsers } from '../../api/users';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    type: '',
    type_capacity: '',
    serial_number: '',
    status: '',
    location: '',
    assigned_to: ''
  });
  const [error, setError] = useState('');
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, users] = await Promise.all([
          getProduct(id),
          getUsers()
        ]);
        
        setFormData({
          user_id: product.user_id,
          name: product.name,
          type: product.type,
          type_capacity: product.type_capacity,
          serial_number: product.serial_number,
          status: product.status,
          location: product.location,
          assigned_to: product.assigned_to || ''
        });
        
        setCustomers(users.filter(u => u.role === 'customer'));
        setTechnicians(users.filter(u => u.role === 'technician'));
        setLoading(false);
      } catch (err) {
        setError('Error fetching product data');
        setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product');
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
          Edit Product
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
            Update
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

export default EditProduct;
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Chip
  } from '@mui/material';
  import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
  
  const ProductsTable = ({ 
    products, 
    onEdit, 
    onDelete,
    loading 
  }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active': return 'success';
        case 'Needs Maintenance': return 'warning';
        case 'Expired': return 'error';
        default: return 'default';
      }
    };
  
    if (loading) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading products...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  
    if (products.length === 0) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.serial_number}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.status} 
                    color={getStatusColor(product.status)} 
                  />
                </TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => onEdit(product.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => onDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default ProductsTable;
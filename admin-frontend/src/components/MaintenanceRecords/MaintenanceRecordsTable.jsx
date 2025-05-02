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
  
  const MaintenanceRecordsTable = ({ 
    records, 
    onEdit, 
    onDelete,
    loading 
  }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'overdue': return 'error';
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
                  Loading records...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  
    if (records.length === 0) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No maintenance records found
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
              <TableCell>Product</TableCell>
              <TableCell>Technician</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>
                  {record.product?.name || `Product #${record.product_id}`}
                </TableCell>
                <TableCell>
                  {record.technician?.name || 'Unassigned'}
                </TableCell>
                <TableCell>
                  {new Date(record.maintenance_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={record.status} 
                    color={getStatusColor(record.status)} 
                  />
                </TableCell>
                <TableCell>
                  {record.notes?.substring(0, 30) || 'None'}
                  {record.notes?.length > 30 && '...'}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => onEdit(record.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => onDelete(record.id)}
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
  
  export default MaintenanceRecordsTable;
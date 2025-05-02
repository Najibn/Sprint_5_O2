import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography,
  CircularProgress
} from '@mui/material';
import MaintenanceRecordsTable from '../../components/MaintenanceRecords/MaintenanceRecordsTable';
import { getMaintenanceRecords, deleteMaintenanceRecord } from '../../api/maintenanceRecords';

const ListMaintenanceRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getMaintenanceRecords();
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleEdit = (id) => {
    navigate(`/maintenance-records/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      try {
        await deleteMaintenanceRecord(id);
        setRecords(records.filter(record => record.id !== id));
      } catch (error) {
        console.error('Error deleting maintenance record:', error);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Maintenance Records</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/maintenance-records/create')}
        >
          Create Record
        </Button>
      </Box>
      
      <MaintenanceRecordsTable 
        records={records} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default ListMaintenanceRecords;
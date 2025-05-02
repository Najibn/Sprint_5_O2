import { 
    Box, 
    TextField, 
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers';
  
  const MaintenanceRecordForm = ({ 
    formData, 
    onChange, 
    onDateChange,
    products,
    technicians,
    errors = {} 
  }) => {
    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.product_id}>
              <InputLabel>Product</InputLabel>
              <Select
                name="product_id"
                value={formData.product_id}
                onChange={onChange}
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
            <FormControl fullWidth margin="normal" error={!!errors.technician_id}>
              <InputLabel>Technician</InputLabel>
              <Select
                name="technician_id"
                value={formData.technician_id}
                onChange={onChange}
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
              onChange={onDateChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  margin="normal" 
                  required 
                  error={!!errors.maintenance_date}
                  helperText={errors.maintenance_date}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={onChange}
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
              onChange={onChange}
              multiline
              rows={4}
              error={!!errors.notes}
              helperText={errors.notes}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default MaintenanceRecordForm;
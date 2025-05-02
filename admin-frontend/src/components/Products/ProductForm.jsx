import { 
    Box, 
    TextField, 
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid
  } from '@mui/material';
  
  const ProductForm = ({ 
    formData, 
    onChange,
    customers = [],
    technicians = [],
    errors = {} 
  }) => {
    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.user_id}>
              <InputLabel>Customer</InputLabel>
              <Select
                name="user_id"
                value={formData.user_id}
                onChange={onChange}
                label="Customer"
                required
              >
                {customers.map(user => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.name}>
              <InputLabel>Name</InputLabel>
              <Select
                name="name"
                value={formData.name}
                onChange={onChange}
                label="Name"
                required
              >
                <MenuItem value="Fire Extinguisher">Fire Extinguisher</MenuItem>
                <MenuItem value="Smoke Detector">Smoke Detector</MenuItem>
                <MenuItem value="Fire Alarm">Fire Alarm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.type}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={onChange}
                label="Type"
                required
              >
                <MenuItem value="water">Water</MenuItem>
                <MenuItem value="foam">Foam</MenuItem>
                <MenuItem value="CO2">CO2</MenuItem>
                <MenuItem value="DCP">DCP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type Capacity"
              name="type_capacity"
              fullWidth
              margin="normal"
              value={formData.type_capacity}
              onChange={onChange}
              required
              error={!!errors.type_capacity}
              helperText={errors.type_capacity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Serial Number"
              name="serial_number"
              fullWidth
              margin="normal"
              value={formData.serial_number}
              onChange={onChange}
              required
              error={!!errors.serial_number}
              helperText={errors.serial_number}
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
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Needs Maintenance">Needs Maintenance</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={onChange}
              required
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Assigned Technician</InputLabel>
              <Select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={onChange}
                label="Assigned Technician"
              >
                <MenuItem value="">None</MenuItem>
                {technicians.map(tech => (
                  <MenuItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default ProductForm;
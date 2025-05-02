import { 
    Box, 
    TextField, 
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid
  } from '@mui/material';
  
  const UserForm = ({ 
    formData, 
    onChange,
    isEdit = false,
    errors = {} 
  }) => {
    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={onChange}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={onChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          {!isEdit && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={onChange}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="password_confirmation"
                  fullWidth
                  margin="normal"
                  value={formData.password_confirmation}
                  onChange={onChange}
                  required
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={onChange}
                label="Role"
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="technician">Technician</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={onChange}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default UserForm;
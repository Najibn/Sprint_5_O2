import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const AdminRoute = () => {
  const { user } = useAuth();

  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;
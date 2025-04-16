import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'artist' | 'listener' | 'admin' | 'super_admin';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { user, userRole } = useAuthStore();
  const location = useLocation();

  if (!user) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    // Check if user has required role (or is super_admin)
    const hasPermission = userRole === requiredRole || userRole === 'super_admin';
    if (!hasPermission) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = userRole === 'artist' ? '/artist/dashboard' : '/listener/feed';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;

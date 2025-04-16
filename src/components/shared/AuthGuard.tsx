// src/components/shared/AuthGuard.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import LoadingScreen from './LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'listener' | 'artist' | 'admin';
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    } else if (
      user &&
      requiredRole &&
      user.role !== requiredRole &&
      user.role !== (requiredRole === 'admin' ? 'super_admin' : requiredRole)
    ) {
      const fallback = user.role === 'artist' ? '/artist/dashboard' : '/explore';
      navigate(fallback, { replace: true });
    }
  }, [user, loading, requiredRole, location.pathname, navigate]);

  if (loading || (!user && !requiredRole)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;

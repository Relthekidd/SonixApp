import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';

export const useRedirectByRole = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();

  useEffect(() => {
    if (!profile) return;

    const routeByRole = {
      admin: '/admin/dashboard',
      artist: '/artist/dashboard',
      listener: '/explore',
    };

    const fallback = '/welcome';
    const targetRoute = routeByRole[profile.role as keyof typeof routeByRole] || fallback;

    navigate(targetRoute, { replace: true });
  }, [profile, navigate]);
};

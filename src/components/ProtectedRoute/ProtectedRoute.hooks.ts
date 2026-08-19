import { useEffect } from 'react';
import { useAuthStore } from '../../auth';

export const useProtectedRoute = () => {
  const status = useAuthStore((state) => state.status);
  const role = useAuthStore((state) => state.user?.role);
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return {
    isChecking: status === 'idle' || status === 'checking',
    isAuthenticated: status === 'authenticated',
    role,
  };
};

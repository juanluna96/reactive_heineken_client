import type { ReactNode } from 'react';
import type { AdminRole } from '../../api';

export interface ProtectedRouteProps {
  children: ReactNode;
  /** When set, an authenticated user whose role isn't in this list is redirected to the admin home instead of seeing the page. */
  allowedRoles?: AdminRole[];
}

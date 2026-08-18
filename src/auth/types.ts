import type { AdminUserDto } from '../api';

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: AdminUserDto | null;
  status: AuthStatus;
  /** Checks the session cookie once and caches the result — safe to call from multiple screens. */
  checkSession: () => Promise<void>;
  setUser: (user: AdminUserDto) => void;
  clearUser: () => void;
}

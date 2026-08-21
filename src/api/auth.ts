import { apiRequest } from './client';
import type { AdminUserDto, LoginPayload, RegisterPayload, ResetPasswordPayload } from './types';

export const login = (payload: LoginPayload): Promise<AdminUserDto> =>
  apiRequest<AdminUserDto>('/auth/login', { method: 'POST', body: JSON.stringify(payload) });

export const register = (payload: RegisterPayload): Promise<AdminUserDto> =>
  apiRequest<AdminUserDto>('/auth/register', { method: 'POST', body: JSON.stringify(payload) });

export const logout = (): Promise<void> => apiRequest<void>('/auth/logout', { method: 'POST' });

export const fetchCurrentUser = (): Promise<AdminUserDto> => apiRequest<AdminUserDto>('/auth/me');

// Always resolves (the API returns 204 whether or not the email is
// registered, to avoid leaking which accounts exist) — see server README's
// "Password reset emails" section.
export const requestPasswordReset = (email: string): Promise<void> =>
  apiRequest<void>('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

export const resetPassword = (payload: ResetPasswordPayload): Promise<void> =>
  apiRequest<void>('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) });

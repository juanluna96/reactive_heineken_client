import { apiRequest } from './client';
import type { AdminUserDto, LoginPayload, RegisterPayload } from './types';

export const login = (payload: LoginPayload): Promise<AdminUserDto> =>
  apiRequest<AdminUserDto>('/auth/login', { method: 'POST', body: JSON.stringify(payload) });

export const register = (payload: RegisterPayload): Promise<AdminUserDto> =>
  apiRequest<AdminUserDto>('/auth/register', { method: 'POST', body: JSON.stringify(payload) });

export const logout = (): Promise<void> => apiRequest<void>('/auth/logout', { method: 'POST' });

export const fetchCurrentUser = (): Promise<AdminUserDto> => apiRequest<AdminUserDto>('/auth/me');

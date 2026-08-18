import type { AdminRole } from './api';

export const ROUTES = {
  welcome: '/',
  registration: '/registration',
  watchExperience: '/registration/watch',
  rateBeerMaster: '/registration/rate',
  thankYou: '/registration/thanks',
  adminHome: '/admin/home',
  adminRestaurants: '/admin/restaurants',
  adminBeerMasters: '/admin/beer-masters',
  adminRatings: '/admin/ratings',
  authLogin: '/admin/login',
  authRegister: '/admin/register',
  authRememberPassword: '/admin/remember-password',
} as const;

// Where an admin lands right after login/register, and where ProtectedRoute
// sends them back to if they hit a route their role can't see. The
// restaurant role has no dashboard access (see /admin/home's allowedRoles),
// so it lands on the restaurants ranking instead.
export const getDefaultAdminRoute = (role: AdminRole): string =>
  role === 'restaurant' ? ROUTES.adminRestaurants : ROUTES.adminHome;

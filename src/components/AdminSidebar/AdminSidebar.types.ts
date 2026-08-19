export type AdminNavItem = 'dashboard' | 'restaurants' | 'beerMasters' | 'ratings' | 'settings';

export interface AdminSidebarProps {
  activeItem: AdminNavItem;
}

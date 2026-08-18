import heinekenLogo from '../../assets/logos/heineken-logo.png';
import * as S from './AdminSidebar.styles';
import { useAdminSidebar } from './AdminSidebar.hooks';
import type { AdminSidebarProps } from './AdminSidebar.types';

export const AdminSidebar = ({ activeItem }: AdminSidebarProps) => {
  const { t, currentUser, currentUserInitials, isOwner, handleLogout, handleGoToDashboard, handleGoToRestaurants } =
    useAdminSidebar();
  const nav = t.adminDashboard.nav;

  return (
    <S.Sidebar>
      <div>
        <S.SidebarBrand>
          <S.SidebarLogo src={heinekenLogo} alt="Heineken" />
          <S.SidebarTagline>{t.adminDashboard.pageTitle}</S.SidebarTagline>
        </S.SidebarBrand>
        <S.NavList>
          <S.NavButton type="button" $active={activeItem === 'dashboard'} onClick={handleGoToDashboard}>
            <S.NavIcon>
              <S.DashboardIcon />
            </S.NavIcon>
            {nav.dashboard}
          </S.NavButton>

          {isOwner ? (
            <S.NavButton type="button" $active={activeItem === 'restaurants'} onClick={handleGoToRestaurants}>
              <S.NavIcon>
                <S.RestaurantIcon />
              </S.NavIcon>
              {nav.restaurants}
            </S.NavButton>
          ) : (
            <S.NavItem>
              <S.NavIcon>
                <S.RestaurantIcon />
              </S.NavIcon>
              {nav.restaurants}
            </S.NavItem>
          )}

          <S.NavItem>
            <S.NavIcon>
              <S.BeerMasterIcon />
            </S.NavIcon>
            {nav.beerMasters}
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>
              <S.RatingIcon />
            </S.NavIcon>
            {nav.ratings}
          </S.NavItem>
          <S.NavItem>
            <S.NavIcon>
              <S.SettingsIcon />
            </S.NavIcon>
            {nav.settings}
          </S.NavItem>
        </S.NavList>
      </div>
      {currentUser && (
        <S.UserFooter>
          <S.Avatar>{currentUserInitials}</S.Avatar>
          <S.UserInfo>
            <S.UserName>{currentUser.full_name}</S.UserName>
            <S.UserEmail>{currentUser.email}</S.UserEmail>
          </S.UserInfo>
          <S.LogoutButton type="button" onClick={handleLogout} aria-label="Logout">
            <S.LogoutIcon />
          </S.LogoutButton>
        </S.UserFooter>
      )}
    </S.Sidebar>
  );
};

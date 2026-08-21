import heinekenLogo from '../../assets/logos/heineken-logo.png';
import * as S from './AdminSidebar.styles';
import { useAdminSidebar } from './AdminSidebar.hooks';
import type { AdminSidebarProps } from './AdminSidebar.types';

export const AdminSidebar = ({ activeItem }: AdminSidebarProps) => {
  const {
    t,
    currentUser,
    currentUserInitials,
    canViewDashboard,
    canViewSettings,
    handleLogout,
    handleGoToDashboard,
    handleGoToRestaurants,
    handleGoToBeerMasters,
    handleGoToRatings,
    handleGoToSettings,
  } = useAdminSidebar();
  const nav = t.adminDashboard.nav;

  return (
    <S.Sidebar>
      <div>
        <S.SidebarBrand>
          <S.SidebarLogo src={heinekenLogo} alt="Heineken" />
          <S.SidebarTagline>{t.adminDashboard.pageTitle}</S.SidebarTagline>
        </S.SidebarBrand>
        <S.NavList>
          {canViewDashboard && (
            <S.NavButton type="button" $active={activeItem === 'dashboard'} onClick={handleGoToDashboard}>
              <S.NavIcon>
                <S.DashboardIcon />
              </S.NavIcon>
              {nav.dashboard}
            </S.NavButton>
          )}

          <S.NavButton type="button" $active={activeItem === 'restaurants'} onClick={handleGoToRestaurants}>
            <S.NavIcon>
              <S.RestaurantIcon />
            </S.NavIcon>
            {nav.restaurants}
          </S.NavButton>

          <S.NavButton type="button" $active={activeItem === 'beerMasters'} onClick={handleGoToBeerMasters}>
            <S.NavIcon>
              <S.BeerMasterIcon />
            </S.NavIcon>
            {nav.beerMasters}
          </S.NavButton>
          <S.NavButton type="button" $active={activeItem === 'ratings'} onClick={handleGoToRatings}>
            <S.NavIcon>
              <S.RatingIcon />
            </S.NavIcon>
            {nav.ratings}
          </S.NavButton>
          {canViewSettings && (
            <S.NavButton type="button" $active={activeItem === 'settings'} onClick={handleGoToSettings}>
              <S.NavIcon>
                <S.SettingsIcon />
              </S.NavIcon>
              {nav.settings}
            </S.NavButton>
          )}
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

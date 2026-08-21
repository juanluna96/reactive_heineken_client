import { FaGauge, FaGear, FaMedal, FaRightFromBracket, FaStar, FaUtensils } from 'react-icons/fa6';
import styled, { css } from 'styled-components';
import { ADMIN_DESKTOP_BREAKPOINT, ADMIN_SIDEBAR_WIDTH } from './AdminSidebar.constants';

export const Sidebar = styled.aside`
  display: none;

  @media (min-width: ${ADMIN_DESKTOP_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    inset: 0 auto 0 0;
    width: ${ADMIN_SIDEBAR_WIDTH};
    padding: 24px 16px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(24px);
    border-right: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
    z-index: 10;
  }
`;

export const SidebarBrand = styled.div`
  padding: 0 12px 32px;
`;

export const SidebarLogo = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

export const SidebarTagline = styled.p`
  margin: 8px 0 0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.6;
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const navItemStyles = css<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  text-align: left;

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.brandGreen};
          color: ${theme.colors.ctaText};
          box-shadow: 0 0 15px rgba(112, 220, 141, 0.3);
        `
      : css`
          color: ${theme.colors.mutedText};
          opacity: 0.55;
        `}
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  ${navItemStyles}

  &:hover {
    transform: translateX(4px);
  }
`;

export const NavIcon = styled.span`
  display: flex;
  width: 18px;
  height: 18px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const UserFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 12px 4px;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 11px;
  font-weight: 700;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserEmail = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.mutedText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const DashboardIcon = styled(FaGauge)``;
export const RestaurantIcon = styled(FaUtensils)``;
export const BeerMasterIcon = styled(FaMedal)``;
export const RatingIcon = styled(FaStar)``;
export const SettingsIcon = styled(FaGear)``;
export const LogoutIcon = styled(FaRightFromBracket)``;

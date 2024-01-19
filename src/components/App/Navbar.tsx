import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import { default as MUIMenuItem } from '@mui/material/MenuItem';

import { UIFillImage, UIFlexBox, UIImage, UILink } from '../UI';
import { useDevice } from '@/hooks';
import { UIContainer } from '../UI/Container';
import { UIButton } from '../UI/Button';
import { Colors } from '@/enums';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Context as AuthContext, AuthContextType } from '@/context/auth';
import { useContext, useState } from 'react';
import { useAppToast } from '@/providers';

type Props = {
  showPeople?: boolean;
  showSubscriptions?: boolean;
};
function AppNavbar({ showPeople = false, showSubscriptions = false }: Props) {
  const { logOut, state } = useContext<AuthContextType>(AuthContext);
  const { isBrowserView } = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toast = useAppToast();
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const MobileMenuView = () => {
    return (
      <HamburgerMenuButton onClick={toggleMenu}>
        <UIFillImage
          src="images/burger.svg"
          alt="arrow left"
          width={24}
          height={24}
        />
      </HamburgerMenuButton>
    );
  };
  const DesktopMenuView = () => {
    return (
      <>
        {state.user && (
          <UIFlexBox>
            {showPeople && (
              <UIButton
                title="People"
                buttonColor={Colors.TEXT}
                onClick={() => router.push('/people')}
              />
            )}
            {showSubscriptions && (
              <UIButton title="Subscriptions" buttonColor={Colors.TEXT} />
            )}
          </UIFlexBox>
        )}

        <ProfileContainer>
          <UserMenuButton onClick={handleMenuOpen}>
            <UIImage
              src="images/user.svg"
              width={24}
              height={24}
              alt="user icon"
            />
          </UserMenuButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            elevation={1}
          >
            {state?.user ? (
              <>
                <StyledMuiMenuItem
                  onClick={() => {
                    logOut({ toast });
                    handleMenuClose();
                  }}
                >
                  Log out
                </StyledMuiMenuItem>
              </>
            ) : (
              <StyledMuiMenuItem
                onClick={() => {
                  // logOut({ toast });
                  router.push('/login');
                  handleMenuClose();
                }}
              >
                Log in
              </StyledMuiMenuItem>
            )}
            <StyledMuiMenuItem
              onClick={() => {
                router.push('/forgot-password');
                handleMenuClose();
              }}
            >
              Reset Password
            </StyledMuiMenuItem>
          </Menu>
        </ProfileContainer>
      </>
    );
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: 'none', paddingTop: '120px' }}
    ></AppBar>
  );
}

export default AppNavbar;

const UserMenuButton = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const StyledUIContainer = styled(UIContainer)`
  z-index: 1070;
`;

const StyledToolbar = styled(Toolbar)`
  z-index: 1070;
  background-color: #093545;
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
  padding: 10px 0;
  cursor: pointer;
`;

const StyledMuiMenuItem = styled(MUIMenuItem)`
  font-weight: 600;
`;

const MenuPane = styled.div<{ isMenuOpen: boolean; isBrowserView: boolean }>`
  display: ${({ isBrowserView }) => (isBrowserView ? 'none' : 'flex')};
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 56px;
  z-index: 1000;
  top: ${({ isMenuOpen }) => (isMenuOpen ? '56px' : '-112px')};
  position: absolute;
  background-color: #093545;
  transition: top 0.3s ease-in-out;
  padding-bottom: 10px;
  border-bottom: 2px solid #40404019;
`;

const HamburgerMenuButton = styled.div`
  display: flex;
  cursor: pointer;
`;
const ProfileContainer = styled.div`
  display: flex;
`;

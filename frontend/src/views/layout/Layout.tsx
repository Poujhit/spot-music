/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import SideNav from './SideNav';
// import BackgroundImg from 'assets/gradient-bg.svg';
import React from 'react';
// import TopNav from './components/TopNav';

interface ILayoutProps { }

const Layout: React.FC<ILayoutProps> = () => {
    // const navigate = useNavigate();


    const LayoutRoot = styled('div')(({ theme }) => ({
        display: 'flex',
        flex: '1 1 auto',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 280,
        },
        [theme.breakpoints.down('md')]: {
            backgroundPosition: 'center top',
        },
    }));

    const LayoutContainer = styled('div')({
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        // minHeight: '90vh',
    });

    //   const [openNav, setOpenNav] = createSignal(false);

    //   const location = useLocation();

    //   const pathname = createMemo(() => location.pathname);

    return (
        <>
            {/* <TopNav
        onNavOpen={() => {
          setOpenNav(true);
        }}
      /> */}

            <SideNav
            // pathname={pathname()}
            // onClose={() => {
            //   setOpenNav(false);
            // }}
            // open={openNav()}
            />
            <LayoutRoot>
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
        </>
    );
};
export default Layout;

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { AppLayout } from '@/layouts';
import { useDevice } from '@/hooks';
import { withAuth } from '@/hocs/auth';

const HomePage = () => {
  const { isMobileView } = useDevice();

  const mobileView = () => {
    return (
      <AppLayout title="Home">
        <Box sx={{ my: 6 }}>
          <p>Welcome to the movie app</p>
        </Box>
      </AppLayout>
    );
  };
  const deskTopView = () => {
    return (
      <AppLayout title="Home">
        <Box sx={{ my: 6 }}>
          <p>Welcome to the movie app</p>
        </Box>
      </AppLayout>
    );
  };
  return isMobileView ? mobileView() : deskTopView();
};

export default withAuth()(HomePage);

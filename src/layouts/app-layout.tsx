import { Box, ContainerProps } from '@mui/material';
import { AppSEO, AppNavbar } from '@/components/App';
import { UIContainer } from '@/components/UI/Container';
import { Colors } from '@/enums';
import { useDevice } from '@/hooks';
import styled from '@emotion/styled';

interface Props extends ContainerProps {
  bg?: string;
  title?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
  showPeople?: boolean;
  showSubscriptions?: boolean;
}

const AppLayout = (props: Props) => {
  const { isMobileView } = useDevice();
  return (
    <PageContainer>
      <AppNavbar
        showPeople={props.showPeople}
        showSubscriptions={props.showSubscriptions}
      />
      <AppSEO title={props.title || ''} description={props.description || ''} />
      <UIContainer
        minHeight="calc(100vh - 60px)"
        sx={{
          position: 'relative',
          ...props.sx,
        }}
      >
        {props.children}
      </UIContainer>
    </PageContainer>
  );
};

export default AppLayout;

const PageContainer = styled.div`
  background-color: ${Colors.SURFACE};
  padding: 0;
`;

const MobileContainer = styled.div`
  background-color: ${Colors.SURFACE};
  min-height: '100vh';
`;

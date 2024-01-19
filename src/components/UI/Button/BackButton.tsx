import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDevice } from '@/hooks';
import { UIFillImage } from '../Image';
import { useRouter } from 'next/router';

interface UIBackButtonProps {
  isTitle?: boolean;
  sx?: SxProps<Theme>;
}
export function UIBackButton(props: UIBackButtonProps) {
  const { isMobileView, isTabletView } = useDevice();
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  const MobileBackButton = () => {
    return (
      <Button
        onClick={handleClickBack}
        sx={{
          position: 'relative',
          padding: 0,
          margin: 0,
          minWidth: '20px',
          ...props.sx,
        }}
      >
        <UIFillImage
          src="images/arrow-left.svg"
          width={24}
          height={24}
          alt="arrow back left"
        />
        {props.isTitle && (
          <Typography sx={{ color: '#787D88', fontSize: '14px' }}>
            Back
          </Typography>
        )}
      </Button>
    );
  };

  const DesktopBackButton = () => {
    return (
      <Button
        onClick={handleClickBack}
        sx={{
          position: 'absolute',
          top: '24px',
          left: '8px',
          gap: 1,
        }}
      >
        <UIFillImage
          src="images/arrow-left.svg"
          width={18}
          height={18}
          alt="arrow left"
        />

        <Typography sx={{ color: '#787D88', fontSize: '14px' }}>
          Back
        </Typography>
      </Button>
    );
  };

  return isMobileView ? MobileBackButton() : DesktopBackButton();
}

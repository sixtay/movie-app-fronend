import Link, { LinkProps } from 'next/link';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { removeEmpty } from '@/libs/data-helper';
import { KeyValuePair } from '@/types';

interface UILinkProps extends LinkProps {
  isFlex?: boolean;
  isCenter?: boolean;
  customGaps?: number;
  height?: number;
  width?: number;
  background?: string;
  isBlank?: boolean;
  isHover?: boolean;
  sx?: SxProps<Theme>;
  children: React.ReactNode | React.ReactNode[];
}

export function UILink(props: UILinkProps) {
  const customStyles: KeyValuePair = {
    display: props.isFlex && 'flex',
    alignItems: props.isCenter && 'center',
    gap: props.customGaps && `${props.customGaps}px`,
    background: props.background && props.background,
    height: props.height && `${props.height}px`,
    width: props.width && `${props.width}px`,
    transitionDuration: '0.2s',
    '&:hover': {
      transform: props.isHover && 'scale(1.2)',
    },
    textDecoration: 'none',
  };

  return (
    <Box
      component={Link}
      href={props.href}
      target={props.isBlank ? '_blank' : '_self'}
      sx={{ ...removeEmpty(customStyles), ...props.sx }}
    >
      {props.children}
    </Box>
  );
}

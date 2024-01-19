import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material';
import { removeEmpty } from '@/libs/data-helper';
import { KeyValuePair } from '@/types';

interface UIFlexBoxProps extends BoxProps {
  isCenter?: boolean;
  isSpaceBox?: boolean;
  customFlex?: number;
  customGaps?: number;
  height?: number;
  width?: number;
  background?: string;
  borderRadius?: number;
  isColumn?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function UIFlexBox(props: UIFlexBoxProps) {
  const customStyles: KeyValuePair = {
    justifyContent: props.isSpaceBox && 'space-between',
    alignItems: props.isCenter && 'center',
    gap: props.customGaps && `${props.customGaps}px`,
    flex: props.customFlex && props.customFlex,
    flexDirection: props.isColumn && 'column',
    height: props.height && `${props.height}px`,
    width: props.width && `${props.width}px`,
    borderRadius: props.borderRadius && `${props.borderRadius}px`,
    background: props.background && props.background,
  };

  return (
    <Box
      onClick={props.onClick}
      sx={{
        display: 'flex',
        ...removeEmpty(customStyles),
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}

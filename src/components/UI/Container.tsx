import { removeEmpty } from '@/libs/data-helper';
import { KeyValuePair } from '@/types';
import Container from '@mui/material/Container';
import { ContainerProps } from '@mui/material';

interface UIContainerProps extends ContainerProps {
  isFlex?: boolean;
  isCenter?: boolean;
  isSpaceBox?: boolean;
  customFlex?: number;
  customGaps?: number;
  height?: string;
  minHeight?: string;
  background?: string;
  borderRadius?: number;
  isFlexColumn?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export const UIContainer = (props: UIContainerProps) => {
  const customStyles: KeyValuePair = {
    display: props.isFlex && 'flex',
    justifyContent: props.isSpaceBox && 'space-between',
    alignItems: props.isCenter && 'center',
    gap: props.customGaps && `${props.customGaps}px`,
    flex: props.customFlex && props.customFlex,
    height: props.height && `${props.height}`,
    minHeight: props.minHeight && { md: `${props.minHeight}`, xs: '100vh' },
    borderRadius: props.borderRadius && `${props.borderRadius}px`,
    flexDirection: props.isFlexColumn && 'column',
    background: props.background && props.background,
  };
  return (
    <Container
      maxWidth={'xl'}
      sx={{
        ...removeEmpty(customStyles),
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
};

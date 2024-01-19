import Image from 'next/image';
import { appImageLoader, s3ImageLoader } from '@/libs/image-loader';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';
import { KeyValuePair } from '@/types';
import { removeEmpty } from '@/libs/data-helper';
import { Colors } from '@/enums';
import styled from '@emotion/styled';

interface UIImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  isCircle?: boolean;
  isS3Image?: boolean;
  isContain?: boolean;
  isPriority?: boolean;
  sx?: SxProps<Theme>;
  objectFit?: "cover" | "contain"
}

export const UIImage = (props: UIImageProps) => {
  const circleStyles: KeyValuePair = {
    borderRadius: props.isCircle && '50%',
    background: props.isCircle && Colors.WHITE,
    padding: props.isCircle && 2,
  };
  const customStyles = {
    objectFit: props.isContain && 'contain',
    borderRadius: props.borderRadius && `${props.borderRadius}px`,
  };

  let imageLoader = appImageLoader;
  if (props.isS3Image) {
    imageLoader = s3ImageLoader;
  }
  return (
    <Box sx={{
      ...props.sx,
      position: 'relative',
      minWidth: `${props.width || 0}px`,
      minHeight: `${props.height || 0}px`,
      }}
    >
      <Image
        src={props.src}
        loader={imageLoader}
        width={props.width }
        height={props.height }
        fill={!props.width && !props.height}
        priority={props.isPriority ? true : false}
        alt={props.alt}
        style={{ 
          ...removeEmpty(circleStyles), 
          ...removeEmpty(customStyles),
          objectFit: props.objectFit
        }}
      />
    </Box>
  );
};

export const UIFillImage = (props: UIImageProps) => {
  const customStyles: KeyValuePair = {
    height: props.height && `${props.height}px`,
    width: props.width && `${props.width}px`,
  };
  let imageLoader = appImageLoader;
  if (props.isS3Image) {
    imageLoader = s3ImageLoader;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        ...removeEmpty(customStyles),
        ...props.sx,
      }}
    >
      <Image
        src={props.src}
        loader={imageLoader}
        fill
        quality={70}
        alt={props.alt}
        priority={props.isPriority ? true : false}
        style={{ borderRadius: props.borderRadius, objectFit: 'cover' }}
      />
    </Box>
  );
};

export const IconDiv = styled.div<{
  imgPath: string;
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width || 24}px;
  height: ${(props) => props.height || 24}px;
  background-image: url(${(props) => props.imgPath});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 12px;
`;

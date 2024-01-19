import React from 'react';
import Typography from '@mui/material/Typography';
import { TypographyProps } from '@mui/material';
import { KeyValuePair, SizeProps } from '@/types';
import { Colors } from '@/enums';

interface UITypographyProps extends TypographyProps {
  title: string;
  size: SizeProps | string;
  titleColor?: string;
  customLineHeight?: number;
  isCenter?: boolean;
}

export function UITypographyTitle(props: UITypographyProps) {
  const customStyles: KeyValuePair = {
    fontWeight: 700,
    fontSize:
      props.size && props.size === 'large'
        ? { md: '52px', xs: '28px' }
        : props.size === 'medium'
        ? { md: '32px', xs: '22px' }
        : props.size === 'small'
        ? { md: '20px', xs: '16px' }
        : props.size,
    lineHeight: {
      md: props.customLineHeight ? `${props.customLineHeight}px` : '57px',
      xs: props.customLineHeight ? `${props.customLineHeight}px` : '31px',
    },
    color: props.titleColor ?? Colors.TEXT,
    textAlign: props.isCenter && 'center',
  };

  return (
    <Typography sx={{ ...customStyles, ...props.sx }}>
      {props.title}
      {props.children}
    </Typography>
  );
}

export function UITypographySubTitle(props: UITypographyProps) {
  const customStyles: KeyValuePair = {
    fontWeight: 500,
    fontSize:
      props.size && props.size === 'large'
        ? { md: '18px', xs: '16px' }
        : props.size === 'medium'
        ? { md: '14px', xs: '14px' }
        : props.size === 'small'
        ? { md: '12px', xs: '12px' }
        : props.size,
    color: props.titleColor ?? Colors.TEXT,
    textAlign: props.isCenter && 'center',
    lineHeight: props.customLineHeight && `${props.customLineHeight}px`,
  };

  return (
    <Typography sx={{ ...customStyles, ...props.sx }}>
      {props.title}
      {props.children}
    </Typography>
  );
}

export function UITypographyParagraph(props: UITypographyProps) {
  const customStyles: KeyValuePair = {
    fontWeight: 400,
    fontSize:
      props.size && props.size === 'large'
        ? { md: '16px', xs: '14px' }
        : props.size === 'medium'
        ? { md: '14px', xs: '12px' }
        : props.size === 'small'
        ? { md: '12px', xs: '12px' }
        : props.size,
    color: props.titleColor ?? Colors.TEXT,
    textAlign: props.isCenter && 'center',
    lineHeight: props.customLineHeight && `${props.customLineHeight}px`,
  };

  return (
    <Typography sx={{ ...customStyles, ...props.sx }} onClick={props.onClick}>
      {props.title}
      {props.children}
    </Typography>
  );
}

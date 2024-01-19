import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material';
import { KeyValuePair } from '@/types';
import { removeEmpty } from '@/libs/data-helper';
import { UIImage } from '../Image';

interface UIButtonProps extends ButtonProps {
  icon?: string;
  iconSize?: number;
  rounded?: boolean;
  buttonColor?: string;
  buttonBackground?: string;
  hoverColor?: string;
  title?: string;
  width?: number;
  titleSize?: number;
}

export function UIButton(props: UIButtonProps) {
  const customStyles: KeyValuePair = {
    background: props.buttonBackground && props.buttonBackground,
    color: props.buttonColor && props.buttonColor,
    borderRadius: props.rounded && `${32}px`,
    width: props.width && `${props.width}px`,
    fontSize: props.titleSize && `${props.titleSize}px`,
    ':hover': {
      backgroundColor: {
        md: props.hoverColor && props.hoverColor,
        xs: props.buttonBackground && props.buttonBackground,
      },
    },
  };

  if (!props.icon) {
    return (
      <Button
        sx={{ ...removeEmpty(customStyles), ...props.sx }}
        onClick={props.onClick}
      >
        {props.title}
        {props.children}
      </Button>
    );
  }

  return (
    <Button
      sx={{ ...removeEmpty(customStyles), ...props.sx }}
      onClick={props.onClick}
    >
      <UIImage
        src={props.icon}
        width={props.iconSize ?? 10}
        height={props.iconSize ?? 10}
        alt={`${props.title}-icon`}
        sx={{ display: 'flex', alignItems: 'center' }}
      />
      {props.title}
      {props.children}
    </Button>
  );
}

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { forwardRef, useCallback, useEffect, useState } from 'react';

export type PasswordFieldProps = TextFieldProps;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const { InputProps, disabled, ...other } = props;

    const [type, setType] = useState<'password' | 'text'>('password');
    const togglePasswordVisibility = useCallback(() => {
      setType(type === 'password' ? 'text' : 'password');
    }, [type]);

    useEffect(() => {
      if (disabled) {
        setType('password');
      }
    }, [disabled]);

    return (
      <TextField
        ref={ref}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Show password" style={{ color: 'white' }}>
                <IconButton
                  aria-label="Show password"
                  onClick={!disabled ? togglePasswordVisibility : undefined}
                  onMouseDown={!disabled ? togglePasswordVisibility : undefined}
                >
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        {...other}
        type={type}
        disabled={disabled}
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';

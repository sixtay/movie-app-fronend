import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

interface UITabPanelProps {
  name: string;
  value: string;
  children: React.ReactNode | React.ReactNode[];
  sx?: SxProps<Theme>;
}
export function UITabPanel(props: UITabPanelProps) {
  return (
    <Box sx={{ ...props.sx, padding: '0' }}>
      {props.value === props.name && props.children}
    </Box>
  );
}

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ChatMenuActionType, ChatMenuType } from '@/types';
import { UIImage } from './Image';
import { UITypographyParagraph } from './Typography';

interface UIMenuProps {
  icon: string;
  iconSize: number;
  menuOptions: ChatMenuType[];
  open: boolean;
  anchorEl: null | HTMLElement;
  onMenuClose: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuItemClick: (value: ChatMenuActionType) => void;
}

export function UIMenu(props: UIMenuProps) {
  return (
    <Box>
      <IconButton size="small" onClick={props.onMenuClick}>
        <UIImage
          src={props.icon}
          width={props.iconSize}
          height={props.iconSize}
          alt="dots three vertical"
        />
      </IconButton>
      <Menu
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onMenuClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        TransitionComponent={Fade}
        slotProps={{ paper: { elevation: 0 } }}
        sx={{ '.MuiMenu-list': { padding: '4px' } }}
      >
        {props.menuOptions.map((option, index) => (
          <MenuItem
            key={`menu-item-${option.value}`}
            onClick={() => {
              props.onMenuItemClick(option.value as ChatMenuActionType);
              props.onMenuClose();
            }}
            sx={{
              width: '213px',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderRadius: '6px',
            }}
          >
            <UITypographyParagraph size="medium" title={option.label} />
            <UIImage
              src={option.icon}
              width={15}
              height={15}
              alt={`chat menu ${index}`}
              sx={{ position: 'relative', top: '2px' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

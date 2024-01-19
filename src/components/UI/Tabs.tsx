import { SxProps, Theme } from '@mui/material';
import { TabDataType, TabType } from '@/types';
import { Colors } from '@/enums';
import { UIButton } from './Button';
import { UIFlexBox } from './Box';
import { useDevice } from '@/hooks';

interface UITabsProps {
  tabList: TabType[];
  onSelected: (data: TabDataType) => void;
  selectedTab?: string;
  sx?: SxProps<Theme>;
}
export function UITabs(props: UITabsProps) {
  const { isMobileView, isTabletView } = useDevice();
  const desktopView = () => {
    return (
      <UIFlexBox
        borderRadius={42}
        isCenter
        isSpaceBox
        background={Colors.SURFACE_TWO}
        sx={{
          maxWidth: isTabletView ? 540 : 762,
          mx: 'auto',
          p: '3px',
          overflowX: 'auto',
          display: isTabletView ? '-webkit-box' : 'flex',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          ...props.sx,
        }}
      >
        {props.tabList.map(({ label, value, id, link, icon }) => {
          let activeColor = undefined;
          if (props.selectedTab === value) {
            activeColor = Colors.WHITE;
          }
          return (
            <UIButton
              key={`tab_${id}`}
              icon={icon}
              iconSize={20}
              rounded
              title={label}
              buttonColor={Colors.TEXT}
              width={176}
              buttonBackground={activeColor}
              hoverColor={Colors.SURFACE}
              onClick={() => {
                props.onSelected({ value, link });
              }}
            />
          );
        })}
      </UIFlexBox>
    );
  };
  const mobileView = () => {
    return (
      <UIFlexBox
        isCenter
        background={Colors.SURFACE_TWO}
        sx={{
          justifyContent: 'center',
          my: '24px',
          p: '3px 24px',
          overflowX: 'auto',
          display: '-webkit-box',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          ...props.sx,
        }}
      >
        {props.tabList.map(({ label, value, id, link, icon }) => {
          let activeColor = undefined;
          if (props.selectedTab === value) {
            activeColor = Colors.WHITE;
          }
          return (
            <UIButton
              key={`tab_${id}`}
              icon={icon}
              iconSize={14.34}
              rounded
              title={label}
              titleSize={14}
              buttonColor={Colors.TEXT}
              buttonBackground={activeColor}
              hoverColor={Colors.SURFACE}
              onClick={() => {
                props.onSelected({ value, link });
              }}
              sx={{ px: '24px' }}
            />
          );
        })}
      </UIFlexBox>
    );
  };
  return isMobileView ? mobileView() : desktopView();
}

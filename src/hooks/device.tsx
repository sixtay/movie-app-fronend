import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
export const useDevice = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isBrowserView, setIsBrowserView] = useState(true);
  const [isTabletView, setIsTabletView] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 767px)');
  const isTablet = useMediaQuery(
    'screen and (min-width: 768px) and (max-width: 1023px)'
  );
  const isBrowser = useMediaQuery('screen and (min-width: 1024px)');
  useEffect(() => {
    setIsMobileView(isMobile);
    setIsBrowserView(isBrowser);
    setIsTabletView(isTablet);
  }, [isMobile, isBrowser, isTablet]);
  return { isMobileView, isBrowserView, isTabletView };
};

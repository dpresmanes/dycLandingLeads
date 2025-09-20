import { useEffect, useState } from 'react';

export type Orientation = 'portrait' | 'landscape';

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  useEffect(() => {
    const checkIsMobile = () => {
      const mq = window.matchMedia('(max-width: 767px)');
      const coarse = window.matchMedia('(pointer: coarse)');
      setIsMobile(mq.matches || coarse.matches);
    };

    const checkOrientation = () => {
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
    };

    checkIsMobile();
    checkOrientation();

    const onResize = () => {
      checkIsMobile();
      checkOrientation();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return { isMobile, orientation };
}
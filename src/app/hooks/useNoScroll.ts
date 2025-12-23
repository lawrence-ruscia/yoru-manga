import { useEffect } from 'react';

export const useNoScroll = (isMenuOpen: boolean) => {
  useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    body.classList.add('no-scroll');

    return () => {
      body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);
};

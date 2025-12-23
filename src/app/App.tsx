import { HeaderNav } from '@/shared/components/HeaderNav/HeaderNav';
import { MobileMenu } from '@/shared/components/MobileMenu';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNoScroll } from './hooks/useNoScroll';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useNoScroll(isMenuOpen);

  return (
    <div>
      <HeaderNav onMenuOpen={() => setIsMenuOpen(true)} />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
      />
      <Outlet />
    </div>
  );
}

export default App;

import { HeaderNav } from '@/shared/components/HeaderNav/HeaderNav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <HeaderNav />
      <Outlet />
    </div>
  );
}

export default App;

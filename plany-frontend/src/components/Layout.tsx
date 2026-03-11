import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex min-h-screen animated-bg font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col pt-0 relative z-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

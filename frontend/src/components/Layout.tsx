import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="w-full max-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <div className="w-[70%] max-w-[1200px]">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
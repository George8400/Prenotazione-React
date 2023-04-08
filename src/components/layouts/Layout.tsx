import { Bars2Icon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = () => {
  return (
    <div className="">
      <nav className="flex items-center bg-[#8D6356] h-11">
        <div className="container lex w-full justify-between items-center flex">
          <img src="/logo.png" alt="" className="-translate-x-3.5" />
          <Bars2Icon className="text-white w-6 h-6" />
        </div>
      </nav>

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

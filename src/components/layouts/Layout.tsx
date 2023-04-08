import { Bars2Icon, CheckCircleIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { FC, useCallback, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import WrapperCard from '../core/WrapperCard';
import SearchSidebar from '../shared/search-sidebar/SearchSidebar';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <nav className="flex items-center bg-[#8D6356] h-11">
        <div className="container lex w-full justify-between items-center flex">
          <img src="/logo.png" alt="" className="-translate-x-3.5" />
          <Bars2Icon className="text-white w-6 h-6" />
        </div>
      </nav>

      <main className="h-full">{children}</main>
    </div>
  );
};

export default Layout;

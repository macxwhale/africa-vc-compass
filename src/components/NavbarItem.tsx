
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarItemProps {
  to: string;
  children: React.ReactNode;
}

const NavbarItem = ({ to, children }: NavbarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-africa-blue text-white" 
          : "text-gray-700 hover:text-africa-blue hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );
};

export default NavbarItem;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-background text-foreground">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;


import React from 'react';
import { User, NavigateFunction } from '../types';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  user: User;
  navigate: NavigateFunction;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, navigate, children }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      <aside className="md:col-span-1 lg:col-span-1">
        <Sidebar user={user} navigate={navigate} />
      </aside>
      <main className="md:col-span-3 lg:col-span-4 animate-fadeIn">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

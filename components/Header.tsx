
import React from 'react';
import { User } from '../types';
import { Logo } from '../constants';
import Avatar from './Avatar';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-sunset-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 text-sunset-orange">
                <Logo />
            </div>
            <span className="ml-3 text-xl font-semibold text-sunset-heading">Tutoriffic</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="font-semibold text-sm text-sunset-heading">{user.name}</p>
                <p className="text-xs text-sunset-subtle-text capitalize">{user.role}</p>
            </div>
            <Avatar user={user} />
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-sunset-subtle-text hover:text-sunset-heading transition-colors rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

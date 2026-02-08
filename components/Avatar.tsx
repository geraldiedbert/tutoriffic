
import React from 'react';
import { User } from '../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-20 w-20',
  };

  return (
    <img
      className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white`}
      src={user.avatarUrl}
      alt={user.name}
    />
  );
};

export default Avatar;

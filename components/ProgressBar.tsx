
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-sunset-subtle-text">Progress</span>
        <span className="text-xs font-medium text-sunset-heading">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-sunset-hover rounded-full h-2">
        <div
          className="bg-gradient-to-r from-sunset-pink to-sunset-orange h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

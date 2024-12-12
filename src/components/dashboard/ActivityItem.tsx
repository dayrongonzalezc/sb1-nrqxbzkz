import React from 'react';

interface ActivityItemProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  title,
  description,
  time,
}) => {
  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${dotColors[type]}`}></div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <span className="ml-auto text-xs text-gray-500">{time}</span>
    </div>
  );
};

export default ActivityItem;
import React from 'react';

interface DeadlineItemProps {
  title: string;
  description: string;
  timeLeft: string;
  isUrgent?: boolean;
}

const DeadlineItem: React.FC<DeadlineItemProps> = ({
  title,
  description,
  timeLeft,
  isUrgent = false,
}) => {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <span className="ml-auto text-xs text-gray-500">{timeLeft}</span>
    </div>
  );
};

export default DeadlineItem;
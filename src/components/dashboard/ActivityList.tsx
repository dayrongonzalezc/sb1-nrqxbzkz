import React from 'react';
import ActivityItem from './ActivityItem';

const ActivityList = () => {
  const activities = [
    {
      type: 'success' as const,
      title: 'New payment received',
      description: '$5,000 - Client #123',
      time: '2h ago',
    },
    {
      type: 'warning' as const,
      title: 'Payment agreement modified',
      description: 'Agreement #789 - Terms updated',
      time: '4h ago',
    },
    {
      type: 'info' as const,
      title: 'New client registered',
      description: 'ABC Corporation',
      time: '6h ago',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
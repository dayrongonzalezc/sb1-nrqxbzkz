import React from 'react';
import DeadlineItem from './DeadlineItem';

const DeadlineList = () => {
  const deadlines = [
    {
      title: 'Payment Due',
      description: 'Agreement #456 - Tomorrow',
      timeLeft: '24h left',
      isUrgent: true,
    },
    {
      title: 'Court Hearing',
      description: 'Case #789 - Next Week',
      timeLeft: '5 days left',
      isUrgent: false,
    },
    {
      title: 'Agreement Expiration',
      description: 'Client: XYZ Corp',
      timeLeft: '7 days left',
      isUrgent: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
      <div className="space-y-4">
        {deadlines.map((deadline, index) => (
          <DeadlineItem key={index} {...deadline} />
        ))}
      </div>
    </div>
  );
};

export default DeadlineList;
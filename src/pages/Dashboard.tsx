import React from 'react';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ActivityList from '../components/dashboard/ActivityList';
import DeadlineList from '../components/dashboard/DeadlineList';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <MetricsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityList />
        <DeadlineList />
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Users, FileText, DollarSign, Gavel } from 'lucide-react';
import DashboardCard from '../DashboardCard';

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard
        title="Total Clients"
        value="156"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <DashboardCard
        title="Active Debts"
        value="1,234"
        icon={FileText}
        trend={{ value: 8, isPositive: true }}
      />
      <DashboardCard
        title="Total Collections"
        value="$2.4M"
        icon={DollarSign}
        trend={{ value: 23, isPositive: true }}
      />
      <DashboardCard
        title="Legal Cases"
        value="45"
        icon={Gavel}
        trend={{ value: 5, isPositive: false }}
      />
    </div>
  );
};

export default MetricsGrid;
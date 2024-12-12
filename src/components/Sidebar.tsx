import React from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  Calendar, 
  Gavel, 
  LayoutDashboard,
  UserCircle,
  LogOut 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: UserCircle, label: 'Debtors', path: '/debtors' },
    { icon: FileText, label: 'Debts', path: '/debts' },
    { icon: Calendar, label: 'Agreements', path: '/agreements' },
    { icon: DollarSign, label: 'Payments', path: '/payments' },
    { icon: Gavel, label: 'Legal Cases', path: '/legal-cases' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <Gavel className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl font-bold">DebtCollect Pro</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
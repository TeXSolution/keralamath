import React from 'react';
import { Users, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234' },
    { icon: HelpCircle, label: 'Total Questions', value: '456' },
    
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gray-900 rounded-full">
                <stat.icon size={32} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-lg">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { BarChart3, Users, ShoppingCart, Package } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching stats
    const fetchStats = async () => {
      try {
        // This would be replaced with actual API calls
        setStats({
          totalOrders: 1250,
          totalRevenue: 450000,
          totalProducts: 342,
          totalUsers: 8934,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: 'text-neon-cyan',
    },
    {
      icon: Package,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'text-neon-magenta',
    },
    {
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'text-neon-lime',
    },
    {
      icon: BarChart3,
      label: 'Total Revenue',
      value: `₱${stats.totalRevenue.toLocaleString()}`,
      color: 'text-neon-purple',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} variant="neon" className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card variant="glass" className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
              <div>
                <p className="text-white font-semibold">Order #{1000 + i}</p>
                <p className="text-gray-400 text-sm">Customer Name</p>
              </div>
              <div className="text-right">
                <p className="text-neon-cyan font-semibold">₱2,999.00</p>
                <p className="text-gray-400 text-sm">Pending</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

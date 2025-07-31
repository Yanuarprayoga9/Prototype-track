import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Activity,
  BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('today');

  // Mock data untuk statistik
  const stats = {
    totalOrders: 1247,
    totalUsers: 3456,
    totalRevenue: 45678000,
    pendingTopups: 23,
    todayOrders: 89,
    activeUsers: 234,
    systemPerformance: 98.5
  };

  const recentOrders = [
    { id: 'SE001234567', user: 'John Doe', amount: 15000, status: 'processing', time: '10:30' },
    { id: 'SE001234568', user: 'Jane Smith', amount: 25000, status: 'shipped', time: '10:15' },
    { id: 'SE001234569', user: 'Bob Wilson', amount: 12000, status: 'delivered', time: '09:45' },
    { id: 'SE001234570', user: 'Alice Brown', amount: 18000, status: 'processing', time: '09:30' },
  ];

  const recentTopups = [
    { id: 'TU001', user: 'Charlie Davis', amount: 100000, status: 'pending', time: '11:00' },
    { id: 'TU002', user: 'Eva Wilson', amount: 50000, status: 'approved', time: '10:45' },
    { id: 'TU003', user: 'Frank Miller', amount: 75000, status: 'pending', time: '10:20' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Kelola sistem dan pantau performa</p>
        </div>

        {/* Date Filter */}
        <div className="mb-6">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="today">Hari Ini</option>
            <option value="week">7 Hari Terakhir</option>
            <option value="month">30 Hari Terakhir</option>
            <option value="year">Tahun Ini</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Order</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{stats.todayOrders} hari ini</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-blue-600">{stats.activeUsers} aktif</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rp {(stats.totalRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600">+12.5% bulan ini</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Top-up</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingTopups}</p>
                <p className="text-sm text-orange-600">Perlu review</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Sistem</h3>
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.systemPerformance}%</p>
                <p className="text-gray-600">System Uptime</p>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-12 w-12 text-blue-600" />
                </div>
                <p className="text-lg text-gray-600">Chart akan ditampilkan di sini</p>
                <p className="text-sm text-gray-500">Integrasi dengan Chart.js</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders and Top-ups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Terbaru</h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.user}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      Rp {order.amount.toLocaleString('id-ID')}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Top-ups */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top-up Terbaru</h3>
            <div className="space-y-4">
              {recentTopups.map((topup) => (
                <div key={topup.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{topup.id}</p>
                    <p className="text-sm text-gray-600">{topup.user}</p>
                    <p className="text-xs text-gray-500">{topup.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      Rp {topup.amount.toLocaleString('id-ID')}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(topup.status)}`}>
                      {topup.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
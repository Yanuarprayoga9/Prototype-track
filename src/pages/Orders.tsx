import React, { useState } from 'react';
import { Package, Calendar, MapPin, Eye, Download, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Order {
  id: string;
  recipient: string;
  destination: string;
  origin: string;
  date: string;
  cost: number;
  status: 'delivered' | 'in_transit' | 'processing' | 'cancelled';
  service: string;
  weight: number;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data untuk daftar order
  const orders: Order[] = [
    {
      id: 'SE001234567',
      recipient: 'John Doe',
      destination: 'Jakarta Selatan',
      origin: 'Bandung',
      date: '2024-01-20',
      cost: 15000,
      status: 'delivered',
      service: 'Express',
      weight: 1.5
    },
    {
      id: 'SE001234568',
      recipient: 'Jane Smith',
      destination: 'Surabaya',
      origin: 'Jakarta',
      date: '2024-01-19',
      cost: 12000,
      status: 'in_transit',
      service: 'Regular',
      weight: 2.0
    },
    {
      id: 'SE001234569',
      recipient: 'Bob Wilson',
      destination: 'Medan',
      origin: 'Jakarta',
      date: '2024-01-18',
      cost: 20000,
      status: 'processing',
      service: 'Express',
      weight: 0.8
    },
    {
      id: 'SE001234570',
      recipient: 'Alice Brown',
      destination: 'Makassar',
      origin: 'Jakarta',
      date: '2024-01-17',
      cost: 25000,
      status: 'delivered',
      service: 'Same Day',
      weight: 1.2
    },
    {
      id: 'SE001234571',
      recipient: 'Charlie Davis',
      destination: 'Semarang',
      origin: 'Jakarta',
      date: '2024-01-16',
      cost: 18000,
      status: 'cancelled',
      service: 'Express',
      weight: 3.0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in_transit': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Terkirim';
      case 'in_transit': return 'Dalam Perjalanan';
      case 'processing': return 'Diproses';
      case 'cancelled': return 'Dibatalkan';
      default: return 'Unknown';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date);
      const now = new Date();
      const diffTime = now.getTime() - orderDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === '7days' && diffDays > 7) return false;
      if (dateFilter === '30days' && diffDays > 30) return false;
      if (dateFilter === '90days' && diffDays > 90) return false;
    }
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Silakan Login</h2>
          <p className="text-gray-600">Anda perlu login untuk melihat daftar order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Order</h1>
          <p className="text-gray-600">Kelola dan pantau semua pengiriman Anda</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Filter</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="processing">Diproses</option>
                <option value="in_transit">Dalam Perjalanan</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Semua Waktu</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="90days">90 Hari Terakhir</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada order</h3>
              <p className="text-gray-600">Belum ada order yang sesuai dengan filter yang dipilih</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">Ke: {order.recipient}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{order.origin} → {order.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(order.date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Layanan:</span> {order.service}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Berat:</span> {order.weight} kg
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-lg font-semibold text-gray-900">
                    Rp {order.cost.toLocaleString('id-ID')}
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Detail</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Unduh</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-green-900">{filteredOrders.length}</h3>
                <p className="text-green-700">Total Order</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900">
                  {filteredOrders.filter(o => o.status === 'delivered').length}
                </h3>
                <p className="text-green-700">Terkirim</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900">
                  Rp {filteredOrders.reduce((sum, order) => sum + order.cost, 0).toLocaleString('id-ID')}
                </h3>
                <p className="text-green-700">Total Biaya</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
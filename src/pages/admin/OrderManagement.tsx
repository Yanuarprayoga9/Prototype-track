import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck,
  MapPin,
  Calendar,
  User,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Order {
  id: string;
  sender: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  recipient: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  package: {
    weight: number;
    service: string;
    insurance: boolean;
  };
  cost: number;
  status: 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  trackingNumber: string;
}

const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data
  const orders: Order[] = [
    {
      id: '1',
      sender: {
        name: 'John Doe',
        phone: '+62812345678',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta'
      },
      recipient: {
        name: 'Jane Smith',
        phone: '+62812345679',
        address: 'Jl. Malioboro No. 456',
        city: 'Yogyakarta'
      },
      package: {
        weight: 2.5,
        service: 'Express',
        insurance: true
      },
      cost: 25000,
      status: 'in_transit',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T14:15:00Z',
      trackingNumber: 'SE001234567'
    },
    {
      id: '2',
      sender: {
        name: 'Bob Wilson',
        phone: '+62812345680',
        address: 'Jl. Asia Afrika No. 789',
        city: 'Bandung'
      },
      recipient: {
        name: 'Alice Brown',
        phone: '+62812345681',
        address: 'Jl. Thamrin No. 321',
        city: 'Jakarta'
      },
      package: {
        weight: 1.0,
        service: 'Regular',
        insurance: false
      },
      cost: 12000,
      status: 'delivered',
      createdAt: '2024-01-19T09:15:00Z',
      updatedAt: '2024-01-20T16:30:00Z',
      trackingNumber: 'SE001234568'
    },
    {
      id: '3',
      sender: {
        name: 'Charlie Davis',
        phone: '+62812345682',
        address: 'Jl. Diponegoro No. 654',
        city: 'Surabaya'
      },
      recipient: {
        name: 'Eva Wilson',
        phone: '+62812345683',
        address: 'Jl. Gajah Mada No. 987',
        city: 'Semarang'
      },
      package: {
        weight: 0.5,
        service: 'Same Day',
        insurance: true
      },
      cost: 30000,
      status: 'processing',
      createdAt: '2024-01-20T11:45:00Z',
      updatedAt: '2024-01-20T11:45:00Z',
      trackingNumber: 'SE001234569'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in_transit': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Terkirim';
      case 'in_transit': return 'Dalam Perjalanan';
      case 'shipped': return 'Dikirim';
      case 'processing': return 'Diproses';
      case 'cancelled': return 'Dibatalkan';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'in_transit': return <Truck className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Order</h1>
          <p className="text-gray-600 mt-1">Kelola semua order pengiriman</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nomor resi, pengirim, atau penerima..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="in_transit">Dalam Perjalanan</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nomor Resi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pengirim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penerima
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rute
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Biaya
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.trackingNumber}</div>
                      <div className="text-sm text-gray-500">{order.package.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.sender.name}</div>
                      <div className="text-sm text-gray-500">{order.sender.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.recipient.name}</div>
                      <div className="text-sm text-gray-500">{order.recipient.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 mr-1" />
                        {order.sender.city} → {order.recipient.city}
                      </div>
                      <div className="text-sm text-gray-500">{order.package.weight} kg</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rp {order.cost.toLocaleString('id-ID')}
                      </div>
                      {order.package.insurance && (
                        <div className="text-xs text-green-600">+ Asuransi</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Detail Order</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Informasi Order</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Nomor Resi:</span>
                      <span className="ml-2 font-medium">{selectedOrder.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Layanan:</span>
                      <span className="ml-2 font-medium">{selectedOrder.package.service}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Berat:</span>
                      <span className="ml-2 font-medium">{selectedOrder.package.weight} kg</span>
                    </div>
                  </div>
                </div>

                {/* Sender Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Data Pengirim
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm">
                    <div className="space-y-2">
                      <div><span className="text-gray-600">Nama:</span> <span className="ml-2">{selectedOrder.sender.name}</span></div>
                      <div><span className="text-gray-600">Telepon:</span> <span className="ml-2">{selectedOrder.sender.phone}</span></div>
                      <div><span className="text-gray-600">Alamat:</span> <span className="ml-2">{selectedOrder.sender.address}</span></div>
                      <div><span className="text-gray-600">Kota:</span> <span className="ml-2">{selectedOrder.sender.city}</span></div>
                    </div>
                  </div>
                </div>

                {/* Recipient Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Data Penerima
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm">
                    <div className="space-y-2">
                      <div><span className="text-gray-600">Nama:</span> <span className="ml-2">{selectedOrder.recipient.name}</span></div>
                      <div><span className="text-gray-600">Telepon:</span> <span className="ml-2">{selectedOrder.recipient.phone}</span></div>
                      <div><span className="text-gray-600">Alamat:</span> <span className="ml-2">{selectedOrder.recipient.address}</span></div>
                      <div><span className="text-gray-600">Kota:</span> <span className="ml-2">{selectedOrder.recipient.city}</span></div>
                    </div>
                  </div>
                </div>

                {/* Cost Info */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Biaya Pengiriman</h4>
                  <div className="text-2xl font-bold text-green-600">
                    Rp {selectedOrder.cost.toLocaleString('id-ID')}
                  </div>
                  {selectedOrder.package.insurance && (
                    <div className="text-sm text-green-600 mt-1">Termasuk asuransi</div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
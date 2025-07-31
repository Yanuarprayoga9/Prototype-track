import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Download,
  Calendar
} from 'lucide-react';

interface TopupRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: 'bank_transfer' | 'ewallet' | 'credit_card';
  status: 'pending' | 'approved' | 'rejected';
  proofImage?: string;
  createdAt: string;
  processedAt?: string;
  notes?: string;
}

const TopupManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTopup, setSelectedTopup] = useState<TopupRequest | null>(null);

  // Mock data
  const topupRequests: TopupRequest[] = [
    {
      id: 'TU001',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      amount: 100000,
      method: 'bank_transfer',
      status: 'pending',
      proofImage: 'proof1.jpg',
      createdAt: '2024-01-20T10:30:00Z',
      notes: 'Transfer dari BCA'
    },
    {
      id: 'TU002',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      amount: 50000,
      method: 'ewallet',
      status: 'approved',
      createdAt: '2024-01-20T09:15:00Z',
      processedAt: '2024-01-20T09:30:00Z',
      notes: 'OVO payment'
    },
    {
      id: 'TU003',
      userId: '3',
      userName: 'Bob Wilson',
      userEmail: 'bob@example.com',
      amount: 75000,
      method: 'credit_card',
      status: 'rejected',
      createdAt: '2024-01-19T16:45:00Z',
      processedAt: '2024-01-19T17:00:00Z',
      notes: 'Kartu kredit tidak valid'
    },
    {
      id: 'TU004',
      userId: '4',
      userName: 'Alice Brown',
      userEmail: 'alice@example.com',
      amount: 200000,
      method: 'bank_transfer',
      status: 'pending',
      proofImage: 'proof2.jpg',
      createdAt: '2024-01-20T11:00:00Z',
      notes: 'Transfer dari Mandiri'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'Transfer Bank';
      case 'ewallet': return 'E-Wallet';
      case 'credit_card': return 'Kartu Kredit';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredRequests = topupRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    // Here you would typically make an API call
    console.log(`Approving topup request ${id}`);
  };

  const handleReject = (id: string) => {
    // Here you would typically make an API call
    console.log(`Rejecting topup request ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Top-up</h1>
          <p className="text-gray-600 mt-1">Kelola permintaan top-up saldo pengguna</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {topupRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disetujui</p>
                <p className="text-2xl font-bold text-green-600">
                  {topupRequests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rp {topupRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari ID, nama, atau email..."
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
                <option value="pending">Pending</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        {/* Topup Requests Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pengguna
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metode
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
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                      <div className="text-sm text-gray-500">{request.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rp {request.amount.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getMethodText(request.method)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{getStatusText(request.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(request.createdAt).toLocaleDateString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedTopup(request)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(request.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleReject(request.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Topup Detail Modal */}
        {selectedTopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Detail Top-up</h3>
                <button 
                  onClick={() => setSelectedTopup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ID Request:</span>
                      <div className="font-medium">{selectedTopup.id}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTopup.status)}`}>
                          {getStatusText(selectedTopup.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Pengguna:</span>
                      <div className="font-medium">{selectedTopup.userName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <div className="font-medium">{selectedTopup.userEmail}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Jumlah:</span>
                      <div className="font-medium text-lg text-green-600">
                        Rp {selectedTopup.amount.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Metode:</span>
                      <div className="font-medium">{getMethodText(selectedTopup.method)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-gray-600 text-sm">Catatan:</span>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                    {selectedTopup.notes || 'Tidak ada catatan'}
                  </div>
                </div>

                {selectedTopup.proofImage && (
                  <div>
                    <span className="text-gray-600 text-sm">Bukti Transfer:</span>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                      <button className="flex items-center text-blue-600 hover:text-blue-700">
                        <Download className="h-4 w-4 mr-1" />
                        {selectedTopup.proofImage}
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <div>Dibuat: {new Date(selectedTopup.createdAt).toLocaleString('id-ID')}</div>
                  {selectedTopup.processedAt && (
                    <div>Diproses: {new Date(selectedTopup.processedAt).toLocaleString('id-ID')}</div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {selectedTopup.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => {
                        handleReject(selectedTopup.id);
                        setSelectedTopup(null);
                      }}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Tolak
                    </button>
                    <button 
                      onClick={() => {
                        handleApprove(selectedTopup.id);
                        setSelectedTopup(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Setujui
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setSelectedTopup(null)}
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

export default TopupManagement;
import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  FileText, 
  Users, 
  Package,
  DollarSign,
  TrendingUp,
  Filter
} from 'lucide-react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('orders');
  const [dateRange, setDateRange] = useState('month');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'orders', name: 'Laporan Order', icon: Package },
    { id: 'users', name: 'Laporan Pengguna', icon: Users },
    { id: 'revenue', name: 'Laporan Revenue', icon: DollarSign },
    { id: 'topup', name: 'Laporan Top-up', icon: TrendingUp }
  ];

  const dateRanges = [
    { id: 'today', name: 'Hari Ini' },
    { id: 'week', name: '7 Hari Terakhir' },
    { id: 'month', name: '30 Hari Terakhir' },
    { id: 'quarter', name: '3 Bulan Terakhir' },
    { id: 'year', name: 'Tahun Ini' },
    { id: 'custom', name: 'Custom Range' }
  ];

  // Mock data untuk preview
  const mockData = {
    orders: {
      total: 1247,
      completed: 1156,
      pending: 67,
      cancelled: 24,
      revenue: 45678000
    },
    users: {
      total: 3456,
      new: 234,
      active: 2890,
      inactive: 566
    },
    topup: {
      total: 125,
      approved: 118,
      pending: 5,
      rejected: 2,
      amount: 15750000
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real app, this would trigger a download
    const filename = `${reportType}_report_${dateRange}_${new Date().toISOString().split('T')[0]}.xlsx`;
    console.log(`Generating report: ${filename}`);
    
    setIsGenerating(false);
    alert(`Laporan ${reportTypes.find(r => r.id === reportType)?.name} berhasil diunduh!`);
  };

  const getReportPreview = () => {
    switch (reportType) {
      case 'orders':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockData.orders.total}</div>
              <div className="text-sm text-blue-700">Total Order</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockData.orders.completed}</div>
              <div className="text-sm text-green-700">Selesai</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{mockData.orders.pending}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{mockData.orders.cancelled}</div>
              <div className="text-sm text-red-700">Dibatalkan</div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{mockData.users.total}</div>
              <div className="text-sm text-purple-700">Total User</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockData.users.new}</div>
              <div className="text-sm text-green-700">User Baru</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockData.users.active}</div>
              <div className="text-sm text-blue-700">Aktif</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{mockData.users.inactive}</div>
              <div className="text-sm text-gray-700">Tidak Aktif</div>
            </div>
          </div>
        );
      
      case 'revenue':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                Rp {(mockData.orders.revenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-green-700">Total Revenue</div>
              <div className="text-sm text-green-600 mt-2">+12.5% dari periode sebelumnya</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                Rp {(mockData.orders.revenue / mockData.orders.total).toLocaleString('id-ID')}
              </div>
              <div className="text-blue-700">Rata-rata per Order</div>
              <div className="text-sm text-blue-600 mt-2">Berdasarkan {mockData.orders.total} order</div>
            </div>
          </div>
        );
      
      case 'topup':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{mockData.topup.total}</div>
              <div className="text-sm text-indigo-700">Total Request</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{mockData.topup.approved}</div>
              <div className="text-sm text-green-700">Disetujui</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{mockData.topup.pending}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{mockData.topup.rejected}</div>
              <div className="text-sm text-red-700">Ditolak</div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Laporan & Export Data</h1>
          <p className="text-gray-600 mt-1">Generate dan unduh laporan sistem</p>
        </div>

        {/* Report Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Konfigurasi Laporan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Jenis Laporan
              </label>
              <div className="grid grid-cols-1 gap-2">
                {reportTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <label key={type.id} className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value={type.id}
                        checked={reportType === type.id}
                        onChange={(e) => setReportType(e.target.value)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <IconComponent className="h-4 w-4 ml-3 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">{type.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Periode Waktu
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
              
              {dateRange === 'custom' && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Generate & Download</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Preview Data</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {dateRanges.find(r => r.id === dateRange)?.name}
            </div>
          </div>
          
          {getReportPreview()}
        </div>

        {/* Available Reports */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Format Laporan Tersedia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <FileText className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">Excel (.xlsx)</h3>
                  <p className="text-sm text-gray-600">Spreadsheet dengan formula</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Format terbaik untuk analisis data dan perhitungan
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <FileText className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">PDF (.pdf)</h3>
                  <p className="text-sm text-gray-600">Dokumen siap cetak</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Format untuk presentasi dan arsip dokumen
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">CSV (.csv)</h3>
                  <p className="text-sm text-gray-600">Data mentah</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Format untuk import ke sistem lain
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
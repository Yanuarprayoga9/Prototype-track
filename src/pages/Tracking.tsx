import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, MapPin, Clock, CheckCircle, Truck, User } from 'lucide-react';
import TrackingForm from '../components/TrackingForm';

interface TrackingStep {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  completed: boolean;
}

const Tracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('resi') || '');
  const [trackingData, setTrackingData] = useState<TrackingStep[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (resi: string) => {
    setIsLoading(true);
    setError('');
    setTrackingNumber(resi);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock tracking data
      const mockData: TrackingStep[] = [
        {
          date: '2024-01-20',
          time: '14:30',
          status: 'Terkirim',
          location: 'Jakarta Selatan',
          description: 'Paket telah diterima oleh penerima',
          completed: true
        },
        {
          date: '2024-01-20',
          time: '09:15',
          status: 'Keluar untuk Pengiriman',
          location: 'Jakarta Selatan',
          description: 'Paket keluar dari gudang untuk pengiriman ke alamat tujuan',
          completed: true
        },
        {
          date: '2024-01-19',
          time: '16:45',
          status: 'Tiba di Kota Tujuan',
          location: 'Jakarta Selatan',
          description: 'Paket tiba di kantor cabang tujuan',
          completed: true
        },
        {
          date: '2024-01-19',
          time: '08:30',
          status: 'Dalam Perjalanan',
          location: 'Bandung - Jakarta',
          description: 'Paket dalam perjalanan menuju kota tujuan',
          completed: true
        },
        {
          date: '2024-01-18',
          time: '15:20',
          status: 'Diterima di Kantor Asal',
          location: 'Bandung',
          description: 'Paket diterima dan diproses di kantor cabang asal',
          completed: true
        }
      ];
      
      setTrackingData(mockData);
    } catch (err) {
      setError('Nomor resi tidak ditemukan atau terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('resi')) {
      handleTrack(searchParams.get('resi')!);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lacak Paket</h1>
          <p className="text-gray-600">Pantau status pengiriman paket Anda secara real-time</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <TrackingForm onTrack={handleTrack} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Mencari informasi paket...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Paket Tidak Ditemukan</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && !isLoading && (
          <div className="space-y-6">
            {/* Package Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Resi: {trackingNumber}
                </h2>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {trackingData[0].status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status Terakhir</p>
                    <p className="font-medium text-gray-900">{trackingData[0].status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Waktu Update</p>
                    <p className="font-medium text-gray-900">
                      {trackingData[0].date} {trackingData[0].time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lokasi</p>
                    <p className="font-medium text-gray-900">{trackingData[0].location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Riwayat Pengiriman</h3>
              <div className="space-y-6">
                {trackingData.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-6 w-6" />
                        )}
                      </div>
                      {index < trackingData.length - 1 && (
                        <div className={`w-px h-12 ml-5 mt-2 ${
                          step.completed ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {step.date} {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      <p className="text-sm text-blue-600 mt-1">{step.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <User className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Butuh Bantuan?</h4>
                  <p className="text-blue-700 mt-1">
                    Hubungi customer service kami di <strong>1500-123</strong> atau 
                    email ke <strong>support@swiftexpress.com</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
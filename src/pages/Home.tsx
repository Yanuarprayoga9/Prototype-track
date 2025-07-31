import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Shield, Clock, Star, MapPin } from 'lucide-react';
import TrackingForm from '../components/TrackingForm';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = async (trackingNumber: string) => {
    setIsTracking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate(`/tracking?resi=${trackingNumber}`);
    setIsTracking(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            SwiftExpress
            <span className="block text-yellow-300">Cepat & Terpercaya</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Layanan ekspedisi terdepan dengan sistem kredit yang memudahkan pengiriman Anda. 
            Kirim paket ke seluruh Indonesia dengan tracking real-time dan jaminan keamanan terbaik.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-white">Lacak Paket Anda</h3>
            <TrackingForm onTrack={handleTrack} isLoading={isTracking} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Truck className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-medium">Pengiriman Cepat</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="h-8 w-8 text-blue-300" />
              <span className="text-lg font-medium">Aman & Terpercaya</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-medium">Layanan 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih SwiftExpress?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan solusi pengiriman terbaik dengan teknologi modern dan layanan pelanggan yang responsif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sistem Kredit</h3>
              <p className="text-gray-600">
                Top-up saldo sekali, kirim berkali-kali. Sistem kredit yang fleksibel dan mudah digunakan untuk semua kebutuhan pengiriman Anda.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tracking Real-time</h3>
              <p className="text-gray-600">
                Pantau status pengiriman paket Anda secara real-time dengan sistem tracking yang akurat dan update otomatis.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Jaminan Keamanan</h3>
              <p className="text-gray-600">
                Paket Anda dijamin aman dengan asuransi gratis dan sistem keamanan berlapis untuk melindungi setiap pengiriman.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pengiriman Cepat</h3>
              <p className="text-gray-600">
                Berbagai pilihan layanan dari Regular, Express, hingga Same Day untuk memenuhi kebutuhan pengiriman yang berbeda.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Customer Service 24/7</h3>
              <p className="text-gray-600">
                Tim customer service yang siap membantu Anda 24 jam sehari, 7 hari seminggu melalui berbagai channel komunikasi.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Jangkauan Luas</h3>
              <p className="text-gray-600">
                Melayani pengiriman ke seluruh Indonesia dengan jaringan cabang dan agen yang tersebar di berbagai kota.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      <section  className="py-20 bg-gradient-to-r from-green-500 to-emerald-600" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Mengirim Paket Anda?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Bergabunglah dengan ribuan pelanggan yang telah mempercayai SwiftExpress untuk kebutuhan pengiriman mereka.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Home;
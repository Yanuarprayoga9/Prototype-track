import React from 'react';
import { Shield, Users, Award, Globe, Clock, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang SwiftExpress</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lebih dari 20 tahun melayani Indonesia dengan komitmen memberikan layanan pengiriman terbaik, 
            terpercaya, dan terjangkau untuk semua kalangan.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">10M+</h3>
            <p className="text-gray-600">Pelanggan Setia</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
            <p className="text-gray-600">Cabang & Agen</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">50M+</h3>
            <p className="text-gray-600">Paket Terkirim</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">20+</h3>
            <p className="text-gray-600">Tahun Pengalaman</p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi perusahaan ekspedisi terdepan di Indonesia yang menghubungkan setiap sudut nusantara 
              dengan layanan pengiriman yang cepat, aman, dan terpercaya, serta berkontribusi dalam 
              memajukan perekonomian digital Indonesia.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Memberikan layanan pengiriman berkualitas tinggi</li>
              <li>• Mengembangkan teknologi untuk kemudahan pelanggan</li>
              <li>• Membangun jaringan distribusi yang luas dan merata</li>
              <li>• Menciptakan lapangan kerja untuk masyarakat Indonesia</li>
              <li>• Mendukung pertumbuhan UMKM dan e-commerce</li>
            </ul>
          </div>
        </div>

        {/* Company History */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Sejarah Perusahaan</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">2004 - Awal Mula</h3>
                <p className="text-gray-600">
                  SwiftExpress didirikan dengan visi menghubungkan seluruh Indonesia melalui layanan pengiriman yang handal.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">2010 - Ekspansi Nasional</h3>
                <p className="text-gray-600">
                  Membuka 100 cabang pertama di seluruh Indonesia dan meluncurkan sistem tracking online.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">2015 - Era Digital</h3>
                <p className="text-gray-600">
                  Meluncurkan aplikasi mobile dan sistem pembayaran digital untuk kemudahan pelanggan.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">2020 - Inovasi Berkelanjutan</h3>
                <p className="text-gray-600">
                  Menghadirkan layanan same-day delivery dan sistem kredit untuk mendukung UMKM.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-900">2024 - Masa Depan</h3>
                <p className="text-gray-600">
                  Terus berinovasi dengan teknologi AI dan IoT untuk memberikan pengalaman terbaik bagi pelanggan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Integritas</h3>
              <p className="text-green-100">
                Berkomitmen pada kejujuran dan transparansi dalam setiap layanan
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Inovasi</h3>
              <p className="text-green-100">
                Terus mengembangkan teknologi untuk memberikan solusi terbaik
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Kepuasan Pelanggan</h3>
              <p className="text-green-100">
                Mengutamakan kepuasan dan kepercayaan pelanggan di atas segalanya
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
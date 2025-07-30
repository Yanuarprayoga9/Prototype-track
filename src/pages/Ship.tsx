import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Package, 
  CreditCard, 
  Calculator,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ShippingData {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  weight: number;
  service: string;
  insurance: boolean;
}

const Ship: React.FC = () => {
  const { user, updateCredit } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ShippingData>({
    senderName: user?.name || '',
    senderPhone: user?.phone || '',
    senderAddress: '',
    senderCity: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientCity: '',
    weight: 0,
    service: '',
    insurance: false
  });
  
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { id: 'regular', name: 'Regular (3-4 hari)', baseRate: 8000 },
    { id: 'express', name: 'Express (1-2 hari)', baseRate: 15000 },
    { id: 'sameday', name: 'Same Day', baseRate: 25000 }
  ];

  const cities = [
    'Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 
    'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const calculateShipping = async () => {
    if (!formData.weight || !formData.service || !formData.senderCity || !formData.recipientCity) {
      setError('Harap lengkapi data untuk kalkulasi ongkir');
      return;
    }

    setIsCalculating(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const selectedService = services.find(s => s.id === formData.service);
    if (selectedService) {
      let cost = selectedService.baseRate * Math.ceil(formData.weight);
      
      // Add insurance cost if selected
      if (formData.insurance) {
        cost += 5000;
      }
      
      // Add distance multiplier (mock)
      if (formData.senderCity !== formData.recipientCity) {
        cost += 2000;
      }
      
      setShippingCost(cost);
    }
    
    setIsCalculating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Silakan login terlebih dahulu');
      return;
    }

    if (shippingCost === 0) {
      setError('Harap hitung ongkir terlebih dahulu');
      return;
    }

    if (user.credit < shippingCost) {
      setError(`Saldo tidak mencukupi. Anda memerlukan Rp ${shippingCost.toLocaleString('id-ID')} tetapi saldo Anda hanya Rp ${user.credit.toLocaleString('id-ID')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to create shipping order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Deduct credit
      updateCredit(-shippingCost);
      
      // Generate tracking number
      const trackingNumber = 'SE' + Date.now().toString().slice(-9);
      
      // Redirect to success page with tracking number
      navigate(`/ship/success?resi=${trackingNumber}&cost=${shippingCost}`);
      
    } catch (err) {
      setError('Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kirim Paket</h1>
          <p className="text-gray-600">Buat pesanan pengiriman baru dengan mudah</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sender Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Data Pengirim</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota Asal
                </label>
                <select
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Kota</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <MapPin className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Data Penerima</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  name="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kota Tujuan
                </label>
                <select
                  name="recipientCity"
                  value={formData.recipientCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Kota</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <Package className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Detail Paket</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Berat (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Layanan
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Layanan</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - Rp {service.baseRate.toLocaleString('id-ID')}/kg
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Tambah asuransi (+Rp 5.000)
                  </span>
                </label>
              </div>
            </div>

            {/* Calculate Shipping */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={calculateShipping}
                disabled={isCalculating}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Calculator className="h-5 w-5" />
                <span>{isCalculating ? 'Menghitung...' : 'Hitung Ongkir'}</span>
              </button>
              
              {shippingCost > 0 && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-800">Ongkir Berhasil Dihitung</h3>
                      <p className="text-green-700 text-lg font-semibold">
                        Rp {shippingCost.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Credit & Submit */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Pembayaran</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Saldo Anda</p>
                <p className="text-lg font-semibold text-gray-900">
                  Rp {user?.credit.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || shippingCost === 0}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Memproses Pesanan...</span>
                </>
              ) : (
                <>
                  <Package className="h-5 w-5" />
                  <span>Buat Pesanan - Rp {shippingCost.toLocaleString('id-ID')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ship;
import React, { useState } from 'react';
import { Calculator, MapPin, Package, Truck } from 'lucide-react';

interface OngkirData {
  origin: string;
  destination: string;
  weight: number;
  service: string;
}

const CekOngkir: React.FC = () => {
  const [formData, setFormData] = useState<OngkirData>({
    origin: '',
    destination: '',
    weight: 0,
    service: ''
  });
  
  const [results, setResults] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const cities = [
    'Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 
    'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi'
  ];

  const services = [
    { id: 'regular', name: 'Regular (3-4 hari)', baseRate: 8000 },
    { id: 'express', name: 'Express (1-2 hari)', baseRate: 15000 },
    { id: 'sameday', name: 'Same Day', baseRate: 25000 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateOngkir = async () => {
    if (!formData.origin || !formData.destination || !formData.weight) {
      alert('Harap lengkapi semua data');
      return;
    }

    setIsCalculating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults = services.map(service => {
      let cost = service.baseRate * Math.ceil(formData.weight);
      
      // Add distance multiplier
      if (formData.origin !== formData.destination) {
        cost += 2000;
      }
      
      return {
        service: service.name,
        cost: cost,
        etd: service.id === 'sameday' ? '6-8 jam' : service.id === 'express' ? '1-2 hari' : '3-4 hari'
      };
    });
    
    setResults(mockResults);
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cek Ongkir</h1>
          <p className="text-gray-600">Hitung biaya pengiriman berdasarkan kota asal, tujuan, dan berat paket</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Kota Asal
              </label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Kota Asal</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Kota Tujuan
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Kota Tujuan</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline h-4 w-4 mr-1" />
                Berat (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                step="0.1"
                min="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan berat paket"
                required
              />
            </div>
          </div>

          <button
            onClick={calculateOngkir}
            disabled={isCalculating}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="h-5 w-5" />
            <span>{isCalculating ? 'Menghitung...' : 'Hitung Ongkir'}</span>
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Hasil Perhitungan Ongkir</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{result.service}</h3>
                      <p className="text-sm text-gray-600">Estimasi: {result.etd}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      Rp {result.cost.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CekOngkir;
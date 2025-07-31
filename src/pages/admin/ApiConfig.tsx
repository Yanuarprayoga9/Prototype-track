import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Save, 
  TestTube, 
  CheckCircle, 
  XCircle,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface ApiConfig {
  provider: string;
  apiKey: string;
  baseUrl: string;
  isActive: boolean;
}

const ApiConfig: React.FC = () => {
  const [configs, setConfigs] = useState<ApiConfig[]>([
    {
      provider: 'RajaOngkir',
      apiKey: 'your-rajaongkir-api-key',
      baseUrl: 'https://api.rajaongkir.com/starter',
      isActive: true
    },
    {
      provider: 'JNE Tracking',
      apiKey: 'your-jne-api-key',
      baseUrl: 'https://api.jne.co.id/tracing',
      isActive: false
    },
    {
      provider: 'Pos Indonesia',
      apiKey: 'your-pos-api-key',
      baseUrl: 'https://api.posindonesia.co.id',
      isActive: false
    }
  ]);

  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [testResults, setTestResults] = useState<{ [key: string]: 'success' | 'error' | 'testing' | null }>({});

  const handleConfigChange = (index: number, field: keyof ApiConfig, value: string | boolean) => {
    const newConfigs = [...configs];
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setConfigs(newConfigs);
  };

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const testApiConnection = async (provider: string) => {
    setTestResults(prev => ({ ...prev, [provider]: 'testing' }));
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Random success/failure for demo
    const isSuccess = Math.random() > 0.3;
    setTestResults(prev => ({ 
      ...prev, 
      [provider]: isSuccess ? 'success' : 'error' 
    }));
  };

  const saveConfig = async (index: number) => {
    // Here you would typically make an API call to save the configuration
    console.log('Saving config:', configs[index]);
    
    // Show success message
    alert('Konfigurasi berhasil disimpan!');
  };

  const getTestResultIcon = (result: 'success' | 'error' | 'testing' | null) => {
    switch (result) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'testing':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      default:
        return <TestTube className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Konfigurasi API</h1>
          <p className="text-gray-600 mt-1">Kelola integrasi API dengan vendor ekspedisi</p>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Informasi Penting</h3>
              <p className="text-blue-700 mt-1 text-sm">
                API key akan dienkripsi dan disimpan dengan aman. Pastikan API key yang Anda masukkan valid dan memiliki akses yang diperlukan.
              </p>
            </div>
          </div>
        </div>

        {/* API Configurations */}
        <div className="space-y-6">
          {configs.map((config, index) => (
            <div key={config.provider} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Settings className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{config.provider}</h3>
                    <p className="text-sm text-gray-600">
                      Status: {config.isActive ? 
                        <span className="text-green-600 font-medium">Aktif</span> : 
                        <span className="text-gray-500">Tidak Aktif</span>
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => testApiConnection(config.provider)}
                    disabled={testResults[config.provider] === 'testing'}
                    className="flex items-center space-x-2 px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-colors"
                  >
                    {getTestResultIcon(testResults[config.provider])}
                    <span>Test</span>
                  </button>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.isActive}
                      onChange={(e) => handleConfigChange(index, 'isActive', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Aktifkan</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base URL
                  </label>
                  <input
                    type="url"
                    value={config.baseUrl}
                    onChange={(e) => handleConfigChange(index, 'baseUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://api.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey[config.provider] ? 'text' : 'password'}
                      value={config.apiKey}
                      onChange={(e) => handleConfigChange(index, 'apiKey', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Masukkan API key"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility(config.provider)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showApiKey[config.provider] ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              {testResults[config.provider] && testResults[config.provider] !== 'testing' && (
                <div className={`mt-4 p-3 rounded-lg ${
                  testResults[config.provider] === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {getTestResultIcon(testResults[config.provider])}
                    <span className={`ml-2 text-sm font-medium ${
                      testResults[config.provider] === 'success' 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {testResults[config.provider] === 'success' 
                        ? 'Koneksi API berhasil!' 
                        : 'Koneksi API gagal. Periksa kembali konfigurasi.'}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => saveConfig(index)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Simpan Konfigurasi</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Panduan Penggunaan</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <Key className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
              <div>
                <strong>RajaOngkir:</strong> Digunakan untuk cek ongkir antar kota. Dapatkan API key di rajaongkir.com
              </div>
            </div>
            <div className="flex items-start">
              <Key className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
              <div>
                <strong>JNE Tracking:</strong> Untuk tracking paket JNE. Hubungi JNE untuk mendapatkan akses API
              </div>
            </div>
            <div className="flex items-start">
              <Key className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
              <div>
                <strong>Pos Indonesia:</strong> Tracking paket Pos Indonesia. Daftar di developer.posindonesia.co.id
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Download, Share2, Copy } from 'lucide-react';

const ShipSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  
  const trackingNumber = searchParams.get('resi') || '';
  const cost = searchParams.get('cost') || '0';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil Dibuat!
          </h1>
          <p className="text-gray-600 mb-8">
            Paket Anda telah berhasil didaftarkan dan akan segera diproses
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nomor Resi:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-semibold text-gray-900">
                    {trackingNumber}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Salin nomor resi"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Biaya:</span>
                <span className="font-semibold text-gray-900">
                  Rp {parseInt(cost).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Sedang Diproses
                </span>
              </div>
            </div>
          </div>

          {/* Copy Notification */}
          {copied && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">
                ✓ Nomor resi berhasil disalin!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to={`/tracking?resi=${trackingNumber}`}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Lacak Paket</span>
            </Link>
            
            <div className="flex space-x-4">
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Penting:</strong> Simpan nomor resi Anda untuk melacak status pengiriman. 
              Paket akan diproses dalam 1-2 jam kerja dan Anda akan mendapat notifikasi melalui SMS/email.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center space-x-4">
            <Link
              to="/ship"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Kirim Paket Lagi
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipSuccess;
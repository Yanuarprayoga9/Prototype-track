import React from 'react';
import { Link } from 'react-router-dom';
import { Package, User, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">Ikon Ekspedisi</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link to="/tracking" className="text-gray-600 hover:text-green-600 transition-colors">
              Lacak Paket
            </Link>
            <Link to="/cek-ongkir" className="text-gray-600 hover:text-green-600 transition-colors">
              Cek Ongkir
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-green-600 transition-colors">
              Layanan
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              Tentang Kami
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-green-600 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Kontak
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Rp {user.credit.toLocaleString('id-ID')}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
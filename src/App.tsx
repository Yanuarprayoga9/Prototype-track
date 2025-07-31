import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import Ship from './pages/Ship';
import ShipSuccess from './pages/ShipSuccess';
import CekOngkir from './pages/CekOngkir';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import TopupManagement from './pages/admin/TopupManagement';
import ApiConfig from './pages/admin/ApiConfig';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/ship" element={<Ship />} />
            <Route path="/ship/success" element={<ShipSuccess />} />
            <Route path="/cek-ongkir" element={<CekOngkir />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
            <Route path="/admin/topup" element={<AdminLayout><TopupManagement /></AdminLayout>} />
            <Route path="/admin/api-config" element={<AdminLayout><ApiConfig /></AdminLayout>} />
            <Route path="/admin/reports" element={<AdminLayout><Reports /></AdminLayout>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';

interface TrackingFormProps {
  onTrack: (trackingNumber: string) => void;
  isLoading?: boolean;
}

const TrackingForm: React.FC<TrackingFormProps> = ({ onTrack, isLoading = false }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Package className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Masukkan nomor resi..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Search className={`h-5 w-5 text-green-600 hover:text-green-700 ${isLoading ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </form>
  );
};

export default TrackingForm;
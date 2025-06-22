
import React from 'react';
import { MapPin, Shield } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HotelCompare</h1>
              <p className="text-sm text-gray-600">Find & Compare Hotels</p>
            </div>
          </div>
          
          <button
            onClick={onAdminClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Shield className="h-4 w-4" />
            <span>Admin Panel</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { X, Star, MapPin, Clock, Users } from 'lucide-react';
import { Hotel } from '../types/hotel';

interface ComparisonPanelProps {
  hotels: Hotel[];
  onRemoveHotel: (hotel: Hotel) => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ hotels, onRemoveHotel }) => {
  if (hotels.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Hotel Comparison</h2>
        <p className="text-blue-100">Compare up to 3 hotels side by side</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-6 font-semibold text-gray-800">Hotel</th>
              {hotels.map((hotel) => (
                <th key={hotel.id} className="text-left p-6 min-w-80">
                  <div className="relative">
                    <button
                      onClick={() => onRemoveHotel(hotel)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-semibold text-gray-800">Price per Night</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <span className="text-2xl font-bold text-green-600">${hotel.pricePerNight}</span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-semibold text-gray-800">Rating</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-lg font-semibold">{hotel.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-semibold text-gray-800">Total Rooms</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{hotel.totalRooms} rooms</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-semibold text-gray-800">Check-in / Check-out</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>In: {hotel.checkInTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>Out: {hotel.checkOutTime}</span>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-semibold text-gray-800">Amenities</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <div className="space-y-1">
                    {hotel.amenities.map((amenity) => (
                      <div key={amenity} className="text-sm text-gray-600">• {amenity}</div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-semibold text-gray-800">Room Types</td>
              {hotels.map((hotel) => (
                <td key={hotel.id} className="p-6">
                  <div className="space-y-1">
                    {hotel.roomTypes.map((type) => (
                      <div key={type} className="text-sm text-gray-600">• {type}</div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPanel;

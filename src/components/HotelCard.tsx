
import React from 'react';
import { Star, MapPin, Wifi, Car, Utensils, CheckCircle } from 'lucide-react';
import { Hotel } from '../types/hotel';

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, isSelected, onSelect }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'restaurant': return <Utensils className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 ${
      isSelected ? 'border-blue-500 shadow-blue-100' : 'border-transparent'
    }`}>
      <div className="relative">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={onSelect}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
          <span className="text-lg font-bold">${hotel.pricePerNight}</span>
          <span className="text-sm">/night</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                  {getAmenityIcon(amenity)}
                  <span className="text-xs text-gray-700">{amenity}</span>
                </div>
              ))}
              {hotel.amenities.length > 4 && (
                <div className="bg-gray-100 px-2 py-1 rounded-full">
                  <span className="text-xs text-gray-700">+{hotel.amenities.length - 4} more</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span>{hotel.totalRooms} rooms</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

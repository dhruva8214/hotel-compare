
import React from 'react';
import HotelCard from './HotelCard';
import { Hotel } from '../types/hotel';

interface HotelGridProps {
  hotels: Hotel[];
  selectedHotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelGrid: React.FC<HotelGridProps> = ({ hotels, selectedHotels, onSelectHotel }) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏨</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No hotels found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isSelected={selectedHotels.some(h => h.id === hotel.id)}
          onSelect={() => onSelectHotel(hotel)}
        />
      ))}
    </div>
  );
};

export default HotelGrid;

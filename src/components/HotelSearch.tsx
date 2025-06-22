
import React, { useState } from 'react';
import { Search, MapPin, Star, DollarSign, Filter } from 'lucide-react';

interface HotelSearchProps {
  onSearch: (filters: any) => void;
}

const HotelSearch: React.FC<HotelSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking', 'Beach Access', 'Pet Friendly'];

  const handleSearch = () => {
    onSearch({
      location,
      priceRange,
      rating,
      amenities: selectedAmenities
    });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value={200}>Under $200</option>
            <option value={300}>Under $300</option>
            <option value={500}>Under $500</option>
            <option value={1000}>Any Price</option>
          </select>
        </div>

        <div className="relative">
          <Star className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value={0}>Any Rating</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </button>
        
        {selectedAmenities.length > 0 && (
          <span className="text-sm text-gray-500">
            {selectedAmenities.length} amenities selected
          </span>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelSearch;

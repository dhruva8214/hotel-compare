
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import HotelSearch from '../components/HotelSearch';
import HotelGrid from '../components/HotelGrid';
import ComparisonPanel from '../components/ComparisonPanel';
import AdminPanel from '../components/AdminPanel';
import { Hotel } from '../types/hotel';
import { useHotels } from '../hooks/useHotels';

const Index = () => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useHotels();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    priceRange: [0, 1000],
    rating: 0,
    amenities: [] as string[]
  });

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    let filtered = hotels;

    if (filters.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= filters.rating);
    }

    filtered = filtered.filter(hotel => 
      hotel.pricePerNight >= filters.priceRange[0] && 
      hotel.pricePerNight <= filters.priceRange[1]
    );

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.every((amenity: string) => hotel.amenities.includes(amenity))
      );
    }

    setFilteredHotels(filtered);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    if (selectedHotels.find(h => h.id === hotel.id)) {
      setSelectedHotels(selectedHotels.filter(h => h.id !== hotel.id));
    } else if (selectedHotels.length < 3) {
      setSelectedHotels([...selectedHotels, hotel]);
    }
  };

  React.useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);

  if (isAdmin) {
    return (
      <AdminPanel 
        hotels={hotels}
        onAddHotel={addHotel}
        onUpdateHotel={updateHotel}
        onDeleteHotel={deleteHotel}
        onExitAdmin={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Header onAdminClick={() => setIsAdmin(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare hotels side by side and discover the best deals for your next adventure
          </p>
        </div>

        <HotelSearch onSearch={handleSearch} />
        
        {selectedHotels.length > 0 && (
          <ComparisonPanel 
            hotels={selectedHotels} 
            onRemoveHotel={(hotel) => handleSelectHotel(hotel)}
          />
        )}
        
        <HotelGrid 
          hotels={filteredHotels}
          selectedHotels={selectedHotels}
          onSelectHotel={handleSelectHotel}
        />
      </main>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import HotelGrid from '../components/HotelGrid';
import ComparisonPanel from '../components/ComparisonPanel';
import AdminPanel from '../components/AdminPanel';
import { Hotel } from '../types/hotel';
import { useHotels } from '../hooks/useHotels';

const Index = () => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useHotels();
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSelectHotel = (hotel: Hotel) => {
    if (selectedHotels.find(h => h.id === hotel.id)) {
      setSelectedHotels(selectedHotels.filter(h => h.id !== hotel.id));
    } else if (selectedHotels.length < 3) {
      setSelectedHotels([...selectedHotels, hotel]);
    }
  };

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
        
        {selectedHotels.length > 0 && (
          <ComparisonPanel 
            hotels={selectedHotels} 
            onRemoveHotel={(hotel) => handleSelectHotel(hotel)}
          />
        )}
        
        <HotelGrid 
          hotels={hotels}
          selectedHotels={selectedHotels}
          onSelectHotel={handleSelectHotel}
        />
      </main>
    </div>
  );
};

export default Index;

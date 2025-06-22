
import { useState, useEffect } from 'react';
import { Hotel } from '../types/hotel';

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    rating: 4.8,
    pricePerNight: 299,
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking'],
    roomTypes: ['Standard', 'Deluxe', 'Suite'],
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    services: ['Room Service', '24/7 Concierge', 'Valet Parking', 'Business Center'],
    totalRooms: 200,
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM'
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Miami, FL',
    rating: 4.6,
    pricePerNight: 185,
    images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7'],
    amenities: ['WiFi', 'Beach Access', 'Restaurant', 'Bar', 'Spa'],
    roomTypes: ['Ocean View', 'Beach Front', 'Presidential Suite'],
    description: 'Beautiful beachfront resort with pristine white sand beaches.',
    services: ['Room Service', 'Beach Butler', 'Water Sports', 'Spa Services'],
    totalRooms: 150,
    checkInTime: '4:00 PM',
    checkOutTime: '12:00 PM'
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    location: 'Aspen, CO',
    rating: 4.9,
    pricePerNight: 450,
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'],
    amenities: ['WiFi', 'Fireplace', 'Ski Valet', 'Restaurant', 'Hot Tub'],
    roomTypes: ['Cabin', 'Lodge Suite', 'Mountain View'],
    description: 'Cozy mountain retreat perfect for skiing and relaxation.',
    services: ['Ski Concierge', 'Equipment Rental', 'Guided Tours', 'Spa'],
    totalRooms: 75,
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM'
  },
  {
    id: '4',
    name: 'Urban Boutique Hotel',
    location: 'San Francisco, CA',
    rating: 4.4,
    pricePerNight: 220,
    images: ['https://images.unsplash.com/photo-1483058712412-4245e9b90334'],
    amenities: ['WiFi', 'Rooftop Bar', 'Gym', 'Restaurant', 'Pet Friendly'],
    roomTypes: ['Standard', 'Executive', 'Penthouse'],
    description: 'Modern boutique hotel in downtown San Francisco.',
    services: ['Room Service', 'Pet Services', 'Business Center', 'Laundry'],
    totalRooms: 120,
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM'
  }
];

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);

  const addHotel = (hotel: Omit<Hotel, 'id'>) => {
    const newHotel: Hotel = {
      ...hotel,
      id: Date.now().toString()
    };
    setHotels(prev => [...prev, newHotel]);
  };

  const updateHotel = (id: string, updatedHotel: Partial<Hotel>) => {
    setHotels(prev => prev.map(hotel => 
      hotel.id === id ? { ...hotel, ...updatedHotel } : hotel
    ));
  };

  const deleteHotel = (id: string) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== id));
  };

  return {
    hotels,
    addHotel,
    updateHotel,
    deleteHotel
  };
};

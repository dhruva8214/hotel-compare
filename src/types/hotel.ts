
export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  roomTypes: string[];
  description: string;
  services: string[];
  totalRooms: number;
  checkInTime: string;
  checkOutTime: string;
}

export interface SearchFilters {
  location: string;
  priceRange: [number, number];
  rating: number;
  amenities: string[];
}

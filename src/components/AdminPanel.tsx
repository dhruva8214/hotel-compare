
import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Hotel } from '../types/hotel';

interface AdminPanelProps {
  hotels: Hotel[];
  onAddHotel: (hotel: Omit<Hotel, 'id'>) => void;
  onUpdateHotel: (id: string, hotel: Partial<Hotel>) => void;
  onDeleteHotel: (id: string) => void;
  onExitAdmin: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  hotels,
  onAddHotel,
  onUpdateHotel,
  onDeleteHotel,
  onExitAdmin
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState<Partial<Hotel>>({});

  const resetForm = () => {
    setFormData({});
    setShowAddForm(false);
    setEditingHotel(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHotel) {
      onUpdateHotel(editingHotel.id, formData);
    } else {
      onAddHotel(formData as Omit<Hotel, 'id'>);
    }
    resetForm();
  };

  const startEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData(hotel);
  };

  const defaultFormData = {
    name: '',
    location: '',
    rating: 4.0,
    pricePerNight: 200,
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04'],
    amenities: [],
    roomTypes: [],
    description: '',
    services: [],
    totalRooms: 100,
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onExitAdmin}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Site</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            </div>
            <button
              onClick={() => {
                setFormData(defaultFormData);
                setShowAddForm(true);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Hotel</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {(showAddForm || editingHotel) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerNight || ''}
                    onChange={(e) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Rooms *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalRooms || ''}
                    onChange={(e) => setFormData({ ...formData, totalRooms: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.images?.[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.amenities?.join(', ') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      amenities: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="WiFi, Pool, Gym, Restaurant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Types (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.roomTypes?.join(', ') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      roomTypes: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Standard, Deluxe, Suite"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingHotel ? 'Update Hotel' : 'Add Hotel'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Hotel Management</h2>
            <p className="text-gray-600 mt-1">Manage your hotel listings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-800">Hotel</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Location</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Rating</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Price</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Rooms</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={hotel.images[0]}
                          alt={hotel.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{hotel.name}</div>
                          <div className="text-sm text-gray-600 line-clamp-1">{hotel.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{hotel.location}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">{hotel.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-green-600">${hotel.pricePerNight}</td>
                    <td className="p-4 text-gray-600">{hotel.totalRooms}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startEdit(hotel)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteHotel(hotel.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

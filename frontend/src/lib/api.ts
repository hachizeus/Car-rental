const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://car-rental-backend-80qi.onrender.com/api';

export interface Car {
  _id: string;
  title: string;
  description: string;
  price_per_day: number;
  category: string;
  location: string;
  features: string[];
  is_available: boolean;
  engine?: string;
  transmission?: string;
  fuel_type?: string;
  seats?: number;
  year?: number;
  mileage?: string;
  images: Array<{
    url: string;
    is_primary: boolean;
  }>;
  videos: string[];
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // Get all cars
  getCars: async (): Promise<Car[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        headers: {
          'Cache-Control': 'max-age=300'
        },
        timeout: 10000
      });
      if (!response.ok) {
        if (response.status === 502) {
          throw new Error('Backend server is temporarily unavailable');
        }
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get car by ID
  getCar: async (id: string): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) throw new Error('Failed to fetch car');
    return response.json();
  }
};
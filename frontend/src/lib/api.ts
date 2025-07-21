const API_BASE_URL = 'https://car-rental-backend-n66g.onrender.com/api';

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
    const response = await fetch(`${API_BASE_URL}/cars`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return response.json();
  },

  // Get car by ID
  getCar: async (id: string): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) throw new Error('Failed to fetch car');
    return response.json();
  }
};
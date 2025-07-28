import { withErrorHandling } from './apiErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://car-rental-backend-n66g.onrender.com/api';

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

const getAuthToken = () => localStorage.getItem('token');

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // Cars
  getCars: async (): Promise<Car[]> => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch cars');
    return response.json();
  },

  getCar: async (id: string): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) throw new Error('Failed to fetch car');
    return response.json();
  },

  addCar: async (formData: FormData): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to add car');
    return response.json();
  },

  updateCar: async (id: string, formData: FormData): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    if (!response.ok) throw new Error('Failed to update car');
    return response.json();
  },

  deleteCar: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete car');
  },

  deleteImage: async (carId: string, imageIndex: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}/image/${imageIndex}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete image');
  },

  deleteVideo: async (carId: string, videoIndex: number): Promise<void> => {
    return withErrorHandling(async () => {
      // Validate inputs before making the request
      if (!carId || videoIndex === undefined || videoIndex < 0) {
        throw new Error('Invalid car ID or video index');
      }
      
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      const response = await fetch(`${API_BASE_URL}/cars/${carId}/video/${videoIndex}?t=${timestamp}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete video');
      }
      
      // Return the response data
      return await response.json();
    }, 'Failed to delete video');
  }
};
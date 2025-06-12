import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      
      localStorage.setItem('token', response.data.token);
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to register', loading: false });
      }
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });
      
      localStorage.setItem('token', response.data.token);
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to login', loading: false });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      set({
        user: response.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  updateProfile: async (userData) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${API_URL}/api/users/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      set({
        user: response.data,
        loading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data.message, loading: false });
      } else {
        set({ error: 'Failed to update profile', loading: false });
      }
    }
  },
}));
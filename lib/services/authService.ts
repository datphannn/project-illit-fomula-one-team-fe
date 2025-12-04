import axios from '@/lib/utils/axios';
import { useAuthStore } from '@/lib/store/authStore';

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
  dateOfBirth?: string;
  country?: string;
}

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    // Set auth in store with token - JWT will be decoded automatically in store
    useAuthStore.getState().setAuth(data.token);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (registerData: RegisterData) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      '/auth/register',
      registerData
    );

    // Auto login after registration - JWT will be decoded automatically in store
    useAuthStore.getState().setAuth(data.token);

    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const logout = () => {
  useAuthStore.getState().logout();
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await axios.post('/auth/forgot-password', { email });
    return data;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const { data } = await axios.post('/auth/reset-password', {
      token,
      password,
    });
    return data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const { data } = await axios.get('/auth/verify');
    return data;
  } catch (error) {
    console.error('Verify token error:', error);
    useAuthStore.getState().logout();
    throw error;
  }
};

// Initialize auth from localStorage on app start
export const initializeAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        useAuthStore.getState().setAuth(token);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('token');
      }
    }
  }
};

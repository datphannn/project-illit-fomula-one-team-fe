import axios from '@/lib/utils/axios';
import { useAuthStore } from '@/lib/store/authStore';

export const login = async (email: string, password: string) => {
  const { data } = await axios.post('/auth/login', { email, password });
  useAuthStore.getState().setAuth(data.token);
  return data;
};

export const logout = () => {
  useAuthStore.getState().logout();
};
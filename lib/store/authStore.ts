import { create } from 'zustand';
import { User } from '@/lib/types/user';
import { jwtDecode } from 'jwt-decode'; 

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (token: string) => {
    localStorage.setItem('token', token);
    const decoded: User = jwtDecode(token);
    set({ token, user: decoded });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
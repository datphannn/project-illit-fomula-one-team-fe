import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  RegisterData,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getCurrentUser as getCurrentUserFromStorage,
} from '@/lib/services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const user = await apiLogin(email, password);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          const user = await apiRegister(data);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        apiLogout();
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const user = getCurrentUserFromStorage();
        set({
          user,
          isAuthenticated: !!user,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({ user: state.user }),
    }
  )
);

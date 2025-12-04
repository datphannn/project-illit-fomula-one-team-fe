import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  AuthState,
  LoginCredentials,
  RegisterData,
} from '@/lib/types/user';

// Mock data cho admin
const ADMIN_USER: User = {
  id: 'admin-001',
  email: 'admin@f1stories.com',
  name: 'Administrator',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  createdAt: new Date('2024-01-01'),
  lastLogin: new Date(),
};

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check for admin login
          if (
            credentials.email === 'admin@f1stories.com' &&
            credentials.password === 'admin123'
          ) {
            const token = `jwt-admin-${Date.now()}`;
            set({
              user: ADMIN_USER,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }

          // Check for demo user
          if (
            credentials.email === 'user@example.com' &&
            credentials.password === 'user123'
          ) {
            const demoUser: User = {
              id: 'user-001',
              email: 'user@example.com',
              name: 'Demo User',
              role: 'user',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
              createdAt: new Date('2024-05-01'),
              lastLogin: new Date(),
            };
            const token = `jwt-user-${Date.now()}`;
            set({
              user: demoUser,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }

          // For other users, check if email exists in localStorage
          const storedUsers = localStorage.getItem('f1_users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const user = users.find((u: any) => u.email === credentials.email);

            if (user && user.password === credentials.password) {
              const { password, ...userWithoutPassword } = user;
              const token = `jwt-${user.id}-${Date.now()}`;
              set({
                user: userWithoutPassword,
                token,
                isAuthenticated: true,
                isLoading: false,
              });
              return;
            }
          }

          throw new Error('Invalid email or password');
        } catch (error: any) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          });
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // Validate
          if (data.password !== data.confirmPassword) {
            throw new Error('Passwords do not match');
          }

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check if email already exists
          const storedUsers = localStorage.getItem('f1_users') || '[]';
          const users = JSON.parse(storedUsers);

          if (users.some((u: any) => u.email === data.email)) {
            throw new Error('Email already registered');
          }

          // Create new user
          const newUser = {
            id: `user-${Date.now()}`,
            email: data.email,
            name: data.name,
            password: data.password, // In real app, this should be hashed
            role: 'user' as const,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
            createdAt: new Date(),
          };

          // Save to localStorage
          users.push(newUser);
          localStorage.setItem('f1_users', JSON.stringify(users));

          // Create user object without password for state
          const { password, ...userWithoutPassword } = newUser;
          const token = `jwt-${newUser.id}-${Date.now()}`;

          set({
            user: userWithoutPassword,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: user => set({ user }),
      setToken: token => set({ token }),
      clearError: () => set({ error: null }),

      checkAuth: () => {
        const { token, user } = get();
        if (token && user) {
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

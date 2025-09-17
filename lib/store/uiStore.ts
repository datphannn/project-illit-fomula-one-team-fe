import { create } from 'zustand';

interface UIState {
  isDark: boolean;
  toggleTheme: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
'use client';

import { useTheme } from '@/lib/utils/theme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-yellow-400 transition-colors duration-300" />
      ) : (
        <Sun className="w-5 h-5 text-orange-500 transition-colors duration-300" />
      )}
    </button>
  );
}

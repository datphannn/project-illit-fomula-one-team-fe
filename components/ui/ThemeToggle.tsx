'use client';

import { useTheme } from '@/lib/utils/theme';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Theme toggle placeholder</button>;
}
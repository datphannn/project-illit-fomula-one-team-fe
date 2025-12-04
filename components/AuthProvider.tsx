'use client';

import { useEffect } from 'react';
import { initializeAuth } from '@/lib/services/authService';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return <>{children}</>;
}

// app/[lang]/(routes)/awards/layout.tsx

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'F1 Awards | Formula 1',
  description:
    'Celebrating excellence in Formula 1 - View all F1 awards, winners, and achievements throughout the seasons.',
  keywords: [
    'F1 Awards',
    'Formula 1 Awards',
    'Driver of the Year',
    'Team of the Year',
    'Rookie of the Year',
    'F1 Champions',
    'Racing Awards',
  ],
};

interface AwardsLayoutProps {
  children: ReactNode;
}

export default function AwardsLayout({ children }: AwardsLayoutProps) {
  return <>{children}</>;
}

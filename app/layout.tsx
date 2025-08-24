import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/utils/theme';

export const metadata: Metadata = {
  title: 'Formula 1 - Official Website',
  description: 'Your go-to source for F1 news, results, live timing, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
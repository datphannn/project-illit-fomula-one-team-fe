import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/utils/theme';
import { LocaleProvider } from '@/lib/utils/locale';
import type { Locale } from '@/lib/utils/locale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'ILLIT - Formula 1 Official Website',
  description:
    'Nguồn thông tin chính thức về tin tức, kết quả, lịch thi đấu Formula 1 và hơn thế nữa.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || 'en';
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning className="h-full">
      <body className="h-full min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider initialLocale={locale as Locale}>
            <ThemeProvider>
              <Header />
              <main className="flex-grow container mx-auto px-4">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

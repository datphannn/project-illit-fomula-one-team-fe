import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/lib/utils/theme';
import { LocaleProvider } from '@/lib/utils/locale';
import type { Locale } from '@/lib/utils/locale';
import './globals.css';

export const metadata = {
  title: 'ILLIT - Formula 1 Official Website',
  description:
    'Nguồn thông tin chính thức về tin tức, kết quả, lịch thi đấu Formula 1 và hơn thế nữa.',
};

function getTextDirection(locale: string): 'ltr' | 'rtl' {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ar-eg', 'ar-sa'];
  return rtlLanguages.includes(locale.split('-')[0]) ? 'rtl' : 'ltr';
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params?.locale as Locale) || 'en';
  let messages;

  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../messages/en.json`)).default;
  }

  return (
    <html
      lang={locale}
      dir={getTextDirection(locale)}
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="h-full min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider initialLocale={locale}>
            <ThemeProvider>
              <Header />
              <main className="flex-grow container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-gray-700/30 min-h-full p-6 transition-all duration-300">
                  {children}
                </div>
              </main>
              <Footer />
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

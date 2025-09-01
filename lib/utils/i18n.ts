// lib/utils/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = (locale ?? 'en') as 'en' | 'vi';
  const messages = (
    await import(`../../messages/${currentLocale}.json`)
  ).default as AbstractIntlMessages;

  return {
    locale: currentLocale,
    messages,
  };
});
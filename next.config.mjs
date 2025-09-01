// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/utils/i18n.ts');

export default withNextIntl({
  reactStrictMode: true,
  images: {
    domains: ['example.com'], 
  },
});
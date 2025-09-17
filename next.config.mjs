import withNextIntl from 'next-intl/plugin';

// Khai báo file config i18n ở lib/utils/i18n.ts
const withIntl = withNextIntl('./lib/utils/i18n.ts');

export default withIntl({
  reactStrictMode: true
});

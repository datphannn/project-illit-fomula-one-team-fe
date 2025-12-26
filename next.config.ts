/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {};
module.exports = {
  reactStrictMode: true,
  // images: {
  //   domains: ['content.bloom.uk.com', 'content.roama.com'],
  // },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Bỏ qua ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // i18n
};

export default nextConfig;

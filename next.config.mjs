
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.formula1.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
    // Bỏ qua TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Bỏ qua ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
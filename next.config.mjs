
const nextConfig = {
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
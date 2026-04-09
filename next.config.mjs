const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json'
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  swcMinify: true,
  poweredByHeader: false
};

export default nextConfig;

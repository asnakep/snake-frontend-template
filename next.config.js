/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };

    // Set Webpack output environment configuration for async/await support
    config.output.environment = {
      ...config.output.environment,
      asyncFunction: true,
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.koios.rest/api/v1/:path*',
      },
      {
        source: '/api/current',  // Local endpoint to fetch current data
        destination: 'https://136.243.208.16:443/json/current.json',
      },
    ];
  },
};

module.exports = nextConfig;

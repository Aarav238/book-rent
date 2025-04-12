/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // matches all hosts
      },
    ],
  },
};

export default nextConfig;

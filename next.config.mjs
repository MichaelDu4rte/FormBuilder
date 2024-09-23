/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      'utfs.io',
      'img.clerk.com',
      'subdomain',
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;

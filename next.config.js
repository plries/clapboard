/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://image.tmdb.org")],
    domains: ['image.tmdb.org'],
  },
  turbopack: {
    root: __dirname,
  }
};

module.exports = nextConfig;
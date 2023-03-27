/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PREVIEW_API_KEY: process.env.PREVIEW_API_KEY,
    PROJECT_ID: process.env.PROJECT_ID,
    DELIVERY_API_KEY: process.env.DELIVERY_API_KEY,
  },
};

module.exports = nextConfig

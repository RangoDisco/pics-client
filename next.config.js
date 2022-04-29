/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    HOST_API: process.env.HOST_API,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "api.dev.pics.maxime-dias.fr",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    HOST_API: process.env.HOST_API,
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;

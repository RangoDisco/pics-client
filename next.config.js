/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "picnicstorage.fra1.digitaloceanspaces.com"],
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

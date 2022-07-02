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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;

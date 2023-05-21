/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "jp"],
    defaultLocale: "en",
  },
  output: "export",
};

module.exports = nextConfig;

// @ts-ignore
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {},
};

module.exports = withPWA(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@medusajs/js-sdk'],
  },
  images: {
    domains: ['medusa-server-testing.s3.amazonaws.com'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.ntslive.co.uk', 'media2.ntslive.co.uk', 'media3.ntslive.co.uk'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig

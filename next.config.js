// ================================
// next.config.js
// ================================
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      optimizeCss: true,
    },
    images: {
      domains: ['images.unsplash.com', 'unsplash.com'],
      formats: ['image/webp', 'image/avif'],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    httpAgentOptions: {
      keepAlive: true,
    },
    // Enable strict mode for better development experience
    reactStrictMode: true,
    // Enable SWC minification for better performance
    swcMinify: true,
  }
  
  module.exports = nextConfig
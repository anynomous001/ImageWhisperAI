module.exports = {
  experimental: {
    serverActions: true,
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
  },
  // Allow serving files from public directory
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ]
      }
    ]
  }
};


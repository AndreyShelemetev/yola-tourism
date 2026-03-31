/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // 301 редиректы со старых URL на новые SEO-friendly
      {
        source: '/attractions',
        destination: '/mari-el/yoshkar-ola/dostoprimechatelnosti/',
        permanent: true,
      },
      {
        source: '/attractions/:id(\\d+)',
        destination: '/mari-el/yoshkar-ola/dostoprimechatelnosti/',
        permanent: true,
      },
      {
        source: '/hotels',
        destination: '/mari-el/yoshkar-ola/oteli/',
        permanent: true,
      },
      {
        source: '/hotels/:id(\\d+)',
        destination: '/mari-el/yoshkar-ola/oteli/',
        permanent: true,
      },
      {
        source: '/restaurants',
        destination: '/mari-el/yoshkar-ola/restorany/',
        permanent: true,
      },
      {
        source: '/restaurants/:id(\\d+)',
        destination: '/mari-el/yoshkar-ola/restorany/',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/mari-el/yoshkar-ola/sobytiya/',
        permanent: true,
      },
      {
        source: '/events/:id(\\d+)',
        destination: '/mari-el/yoshkar-ola/sobytiya/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

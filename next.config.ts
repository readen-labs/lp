import type { NextConfig } from 'next';

import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'images.isbndb.com',
      },
      {
        protocol: 'https',
        hostname: 'qksmdkcxwljszptmykyj.supabase.co',
        pathname: '/storage/v1/object/public/avatars/**',
      },
    ],
  },
};

const withMDX = createMDX({});

export default withNextIntl(withMDX(nextConfig));

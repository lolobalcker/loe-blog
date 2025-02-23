import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/loe-blog',
    assetPrefix: '/loe-blog/',
    images: { unoptimized: true},
};

export default nextConfig;

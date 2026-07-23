import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      // Shopify CDN — product images uploaded in Shopify Admin
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      // Shopify CDN alternate domain
      {
        protocol: "https",
        hostname: "**.shopifycdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

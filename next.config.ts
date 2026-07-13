import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['subchronically-intergroup-shante.ngrok-free.dev']
};

export default nextConfig;

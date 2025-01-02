import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "getnextjsthemes.com",
      },
    ],
  },
};

export default nextConfig;

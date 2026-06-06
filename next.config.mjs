/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

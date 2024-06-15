/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: { scrollRestoration: true },
};

export default nextConfig;

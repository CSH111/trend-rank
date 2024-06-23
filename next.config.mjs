/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: { scrollRestoration: true },
  images: { domains: ["localhost", "img-api.sungho.site"] },
};

export default nextConfig;

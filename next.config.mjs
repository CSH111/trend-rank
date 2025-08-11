/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: { scrollRestoration: true },
  images: { domains: ["localhost", "img-api.sungho.site"] },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;

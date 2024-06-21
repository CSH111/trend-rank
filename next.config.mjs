/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: { styledComponents: true },
  experimental: { scrollRestoration: true },
  images: { domains: ["localhost", "img-api.sungho.site"] },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/rank/all?page=1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

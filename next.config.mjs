const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDev ? undefined : "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async rewrites() {
    if (!isDev) return [];
    return {
      beforeFiles: [
        {
          source: "/api/:file(.*\\.php)",
          destination: "http://localhost/ProtectOurBrand/public/api/:file"
        }
      ]
    };
  }
};

export default nextConfig;

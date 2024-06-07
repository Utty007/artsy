/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io", "firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "artsy-ecom.netlify.app",
        port: "3000",
        pathname: "/file-path/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/artsy-auth-project.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;

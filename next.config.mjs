/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: process.env.PATH_PREFIX,
    RUNTIME_IDC_NAME: process.env.RUNTIME_IDC_NAME,
  },
  distDir: "dist",

  async rewrites() {
    let destination;
    switch (process.env.RUNTIME_IDC_NAME) {
      case "local":
        destination = "http://192.168.39.101:8085/:slug*"; // Local development destination
        break;
      case "sg":
        destination = "http://supcononenorth.fortiddns.com:30086/:slug*"; // Production destination in China
        break;
      case "cn":
        destination = "http://office.unibutton.com:6585//:slug*"; // Example destination for Singapore
        break;
      default:
        destination = "http://127.0.0.1:8085/:slug*"; // Default or fallback destination
    }

    return [
      {
        source: "/webapi/:slug*",
        destination: destination,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  // 本番環境でconsoleを削除
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    return config;
  },
};

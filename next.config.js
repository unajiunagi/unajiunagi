/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  // 本番環境でconsoleを削除
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.forEach((plugin) => {
        if (plugin.constructor.name === "TerserPlugin") {
          plugin.options.terserOptions = {
            compress: {
              drop_console: true,
            },
          };
        }
      });
    }
    return config;
  },
};

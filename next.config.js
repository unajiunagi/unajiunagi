/** @type {import('next').NextConfig} */

module.exports = {
  // バグ検出用に2度レンダリングされる
  reactStrictMode: true,
  // next exportで静的ファイルを出力するための設定
  trailingSlash: true,
  // 画像のドメインを許可
  images: {
    domains: ["qkscfkfrmoquyhxnmztr.supabase.co"],
  },
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

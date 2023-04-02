const path = require("path");
const rootPath = path.resolve(__dirname, "../src/");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // next-routerに対応させる
    "storybook-addon-next-router",
    // ウェブアクセシビリティチェックに便利なプラグイン
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  // publicディレクトリの画像ファイルを読み込めるようにする
  staticDirs: ["../public"],
  // ストーリーにglobals.scssを適用させる
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true, // *.module.scssファイル全てを対象
            },
            url: false, // cssのbackgroundで設定した画像へのパスがプロジェクトルートからの絶対パスになるように設定
          },
        },
        "sass-loader",
      ],
      include: path.resolve(__dirname, "../src/"),
    });
    // 絶対パスを使えるように
    config.resolve.alias["@"] = rootPath; // srcを@と省略してパスを記載できるように設定
    return config;
  },
};

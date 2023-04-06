module.exports = {
  stories: [
    "../src/**/*.stories.tsx",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  // publicディレクトリの画像ファイルを読み込めるようにする
  staticDirs: ["../public"],
  docs: {
    autodocs: "automatic",
  },
};

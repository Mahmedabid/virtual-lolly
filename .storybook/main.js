const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // Add Webpack rules for scss modules
    // ========================================================

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: "[name]_[local]_[hash:base64:5]",
            importLoaders: 2,
            camelCase: true,
            sourceMap: false, // turned off as causes delay
          },
        },
        "sass-loader",
      ],
      include: /\.module\.scss$/,
    });

    // Add Webpack rules for scss ans css
    // ========================================================

    config.module.rules.push({
      test: /\.(scss|css)$/,
      exclude: /\.module\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    // Add Webpack rules for svg
    // ========================================================

    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      use: ["@svgr/webpack"],
      exclude: /fonts\/.*\.svg/,
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};
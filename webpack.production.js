const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  stats: {
    errorDetails: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  output: {
    filename: "./[name].[hash:8].js",
    publicPath: "/",
  },
  // devServer: {
  //   port: 1002,
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css",
    }),
  ],
};

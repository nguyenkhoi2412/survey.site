const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    publicPath: "/",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  devServer: {
    port: 1001,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

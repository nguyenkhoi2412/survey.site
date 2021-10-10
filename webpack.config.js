const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//#region path url
var APP_DIR = path.resolve(__dirname, "./src");
var BUILD_DIR = path.join(__dirname, "./build");
var PUBLIC_DIR = path.resolve(__dirname, "./public");
//#endregion

//#region convert less-vars-to-js
const fs = require("fs");
const lessToJs = require("less-vars-to-js");

// Read the less file in as string
const paletteLess = fs.readFileSync(
  path.join(__dirname, "./src/assets/_variables.less"),
  "utf8"
);
// Pass in file contents
const themeAntdPalette = lessToJs(paletteLess, {
  resolveVariables: true,
  stripPrefix: true,
});
//#endregion

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const isDev = mode === "development";

  const baseConfig = {
    entry: {
      index: APP_DIR + "/index.js",
    },
    module: {
      rules: [
        //#region Rules for js
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react",
                {
                  plugins: ["@babel/plugin-transform-react-jsx"],
                },
              ],
            },
          },
        },
        //#endregion
        //#region Rules for css
        {
          test: /\.(less|s[ac]ss|css)$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  paths: [path.resolve(__dirname, "node_modules")],
                  javascriptEnabled: true, // important for less read scripts
                  modifyVars: themeAntdPalette,
                },
              },
            },
            {
              loader: "style-resources-loader",
              options: {
                patterns: require(path.join(
                  process.cwd(),
                  "src/assets/_utils.js"
                )),
              },
            },
            // {
            //   loader: "sass-loader",
            //   options: { sourceMap: true },
            // },
            // {
            //   loader: "sass-resources-loader",
            //   options: {
            //     resources: require(path.join(
            //       process.cwd(),
            //       "src/assets/_utils.js"
            //     )),
            //   },
            // },
          ],
        },
        //#endregion
        //#region Rules for images
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        //#endregion
        //#region Rules for fonts
        {
          // config for fonts
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        //#endregion
      ],
    },
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
      alias: {
        "@": APP_DIR, // shortcut to reference src folder from anywhere
        "@@": path.resolve(),
        "@app": APP_DIR + "/app",
        "@assets": APP_DIR + "/assets",
        "@containers": APP_DIR + "/containers",
        "@dashboard": APP_DIR + "/dashboard",
        "@components": APP_DIR + "/components",
        "@surveys": APP_DIR + "/www/survey",
        "@transports": APP_DIR + "/www/transport",
        "@redux": APP_DIR + "/redux",
        "@utils": APP_DIR + "/utils",
        "@services": APP_DIR + "/services",
        "@stores": APP_DIR + "/stores",
      },
      fallback: {
        crypto: false,
      },
    },
    output: {
      path: BUILD_DIR,
    },
    devServer: {
      contentBase: BUILD_DIR,
      compress: true,
      hot: true,
      watchContentBase: true,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv({
        path: `./.env.` + mode,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: APP_DIR + "/assets",
            to: BUILD_DIR + "/assets",
            toType: "dir",
          },
        ],
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HotModuleReplacementPlugin(), // renew components
      new webpack.ProgressPlugin(), // display % when run webpack
      new webpack.ProvidePlugin({
        // using anywhere
        $: "jquery",
        jQuery: "jquery",
        React: "react",
      }),
      new HtmlWebpackPlugin({
        // plugin for inserting scripts into html
        template: PUBLIC_DIR + "/index.html",
        filename: "index.html",
        // title: "Survey Management System",
        // favicon: path.resolve(__dirname, "./assets/favicons/dashboard/favicon.ico"), //them file favicon vào trang html
        hash: true, //them thẻ <script> với đường link đính kèm 1 mã hash
        showErrors: false, //neu co loi sẽ ghi vào file html
        minify: isDev
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
      }),
    ],
  };

  return merge(baseConfig, require("./webpack." + mode));
};

const path = require('path')
const glob = require('glob')
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const TailwindCss = require('tailwindcss');

module.exports = (env, options) => {
  const devMode = options.mode !== "production"
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: !devMode,
          parallel: true,
          sourceMap: devMode,
        }),
      ]
    },
    entry: {
      script: ["./src/js/script.js"],
      style: ["./src/js/style.js"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "output/src/js"),
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: [
            // The `injectType`  option can be avoided because it is default behaviour
            {
              loader: 'style-loader',
              options: {
                injectType: 'styleTag'
              }
            }
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: devMode
              },
            },
            // { loader: "sass-loader", options: { sourceMap: devMode } },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: devMode,
                postcssOptions: {
                  plugins: [
                    ['postcss-import', {
                      path: ['./node_modules'],
                    }],
                    TailwindCss('./tailwind.config.js'),
                    ['postcss-nested', {}],
                    ['postcss-custom-properties', {}],
                    ['autoprefixer', {}],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
    devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin({
        filename: "../css/[name].css",
        chunkFilename: "../css/[id].css",
      }),
      new CopyWebpackPlugin([{
        from: "src/index.html",
        to: "../"
      }, ]),
      new FixStyleOnlyEntriesPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ],
  }
}

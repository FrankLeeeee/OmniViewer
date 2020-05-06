const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: "production",
  entry: {
    client: ["@babel/polyfill", "./src/index.js"],
    vendor: [
      "react",
      "react-dom",
      "react-router-dom",
      "redux",
      "react-redux",
      "query-string",
    ],
    design: ["bootstrap", "react-bootstrap", "chart.js", "react-chartjs-2"],
    icon: [
      "@ant-design/icons",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome",
    ],
  },
  output: {
    filename: "[name].chunkhash.bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    chunkFilename: "[name].chunkhash.bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all",
        },
        design: {
          test: /[\\/]node_modules[\\/]/,
          name: "designs",
          enforce: true,
          chunks: "all",
        },
        icon: {
          test: /[\\/]node_modules[\\/]/,
          name: "icons",
          enforce: true,
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 5000,
    open: true,
    historyApiFallback: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: path.join(__dirname, "public/"),
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: "file-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/,
        exclude: /node_modules/, // 排除掉node_modules，优化打包速度
      },
    ],
  },
  resolve: {
    alias: {
      "@public": resolve("public"), // 这样配置后 @ 可以指向 src 目录
      "@static": resolve("src/static"),
      "@src": resolve("src"),
    },
  },
};

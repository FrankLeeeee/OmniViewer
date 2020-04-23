const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: path.join(__dirname, "public/"),
        use: [{ loader: "url-loader" }],
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
      "@": resolve("public"), // 这样配置后 @ 可以指向 src 目录
    },
  },
};

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => {
  console.log('args: ', args); //! dhj test
  console.log('env: ', env); //! dhj test
  console.log('process', process.env.NODE_ENV);
  
  const config =  {

    // 指定入口文件，程序从这里开始编辑
    // __dirname，当前文件目录
    entry: ["react-hot-loader/patch", "./src/index.js"],
    output: {
      // 输出的路径
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash:8].js", // 打包后文件
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      'static': {
        directory: "./dist",
      },
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: '/publish/index.html',
        filename: 'index.html',
        title: 'small webpack dome'
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        // debug: '',
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
  if(args.hot) {
    config.output.filename = '[name].[hash:8].js';
  }
  return config
};
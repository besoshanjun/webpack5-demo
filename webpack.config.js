const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DeleteCommentsPlugin = require("./plugins/delete-comments-plugin");

module.exports = (env, args) => {
  const {mode} = args
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
          use: {
            loader: "babel-loader",
            // options: {
            //   "presets": ['@babel/preset-env'],
            //   "plugins": ['./ignore-debug-plugin.js']
            // }
          },
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      'static': {
        directory: "./dist",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '/publish/index.html',
        filename: 'index.html',
        title: 'small webpack dome'
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(mode === 'development'),
      }),
    ],
    optimization: {
      // runtimeChunk: 'single',
      // minimize: true,
      // minimizer: [
      //   new TerserPlugin({
      //     parallel: true,
      //     terserOptions: {
      //       compress: {
      //         // pure_funcs: ['debug.live', 'debug.view'], // 删除指定函数
      //         dead_code:true , // 默认。 删除不可达到的代码
      //       }
      //     }
      //   })
      // ],
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
  if(mode !== 'development') {
    config.plugins.push(new DeleteCommentsPlugin())
  }
  return config
};
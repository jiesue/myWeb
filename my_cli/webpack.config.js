const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.js', //单个入口
  // entry: {//多个入口
  //   app: './src/main.js',
  //   vendors: './src/vendors.js'
  // },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除转换目录
        use: [
          {
            loader: 'babel-loader',
            options: {
              // modules: true
              presets: [
                "@babel/env"//转换es6语法
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'react app1',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
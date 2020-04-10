const path = require('path');

// 显示进程的完成进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 设置进度字体颜色
const chalk = require('chalk');
// 以树图的方式展示打包后的文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 分离css代码
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');//copy 用于配置static目录


const isPro = process.env.NODE_ENV === 'production';
let devtool = isPro ? false : 'cheap-module-source-map'

module.exports = {
  // mode: 'development',
  //entry: './src/main.js', //单个入口
  entry: {//多个入口
    app: './src/main.js',
    // vendors: './src/vendors.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,//排除转换目录
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/env",//转换es6语法
                // "es2015"

              ],
              plugins: [
                "@babel/plugin-proposal-class-properties" //高级语法 class
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
          // {
          //   loader: "style-loader",
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // {
          //   loader: "style-loader",
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test:/\.png/,
        use:['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'react app1',
      filename: 'index.html',
      template: './src/index.html',
      // inject: true,
      chunks: ['manifest', 'vendor', 'app']
      //第三个’app‘名称 要跟entry中的对应
      //vendor 是指提取涉及 node_modules 中的公共模块；
      //manifest 是对 vendor 模块做的缓存；
    }),
    //多入口需要执行多次
    // new HtmlWebPackPlugin({
    //   title: 'react app2',
    //   filename: 'index2.html',
    //   template: './src/index.html',
    //   chunks: ['manifest', 'vendor', 'vendors']
    // }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',// 分离后的文件名
      chunkFilename: '[id].css',//
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: chalk.green('Progressing') + '[:bar]' + chalk.green(':percent') + '(:elapsed seconds)',
      clear: false
    }),
    // new BundleAnalyzerPlugin() //以树图的方式展示打包后的文件
    new copyWebpackPlugin([{
      from: __dirname + '/static',// 打包的静态资源目录地址
      to: 'static' // 打包到dist下面的static
    }]),
  ],
  //配置端口
  devServer: {
    publicPath: "./",
    //contentBase: "./dist", // 服务启动在哪一个文件夹下
    open: false, // 启动服务时，自动打开浏览器
    port: 8082, // 端口号
    // proxy 跨域时模拟接口代理
    hot: true, // devServer开启Hot Module Replacement的功能
    hotOnly: true // 即便HMP的功能没有生效，浏览器也不能自动刷新
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      // 'static': path.resolve(__dirname, 'static')
    },
    extensions: [".js", 'jsx', ".json", '.scss']
    // extensions: ['.scss','.js']
  },
  devtool: devtool

};
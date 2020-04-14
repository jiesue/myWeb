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
//autoprefixer 插件 为css添加浏览器前缀 postcss-loader
const resolve = (dir) => path.join(__dirname, dir);
const isPro = process.env.NODE_ENV === 'production';
let devtool = isPro ? false : 'cheap-module-source-map'

module.exports = {
  // mode: 'development',
  //entry: './src/main.js', //单个入口
  entry: {//多个入口

    app: ['babel-polyfill', './src/main.js'],
    // vendors: './src/vendors.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'//这个路径影响所有相对路径
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
          loader: 'html-loader',
          options: {
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                }
              ]
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader",
          // },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'//抽离css后 需要修改路径
            }
          },

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'//抽离css后 需要修改路径
            }
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { // 配置参数
            // 这种配置语法叫做：占位符
            name: '[name]_[hash].[ext]', // 使用图片的名字，并使用图片的后缀
            limit: 10960,
            outputPath: 'assets/img'//path的显示名称 打包后图片存的文件夹
          }
        }
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
  //配置端口 //跑本地代码
  devServer: {
    publicPath: "/",
    //contentBase: "./dist", // 服务启动在哪一个文件夹下
    open: false, // 启动服务时，自动打开浏览器
    port: 8082, // 端口号
    // proxy 跨域时模拟接口代理
    hot: true, // devServer开启Hot Module Replacement的功能
    hotOnly: false, // 即便HMP的功能没有生效，浏览器也不能自动刷新
    // proxy: { //配置多个跨域
    //   "/api": {
    //     target: "http://172.11.11.11:7071",
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/"
    //     }
    //   },
    //   "/api2": {
    //     target: "http://172.12.12.12:2018",
    //     changeOrigin: true,
    //     //ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api2": "/"
    //     }
    //   },
    // }

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      // 'static': path.resolve(__dirname, 'static')
    },
    extensions: [".js", '.jsx', ".json", '.scss']
    // extensions: ['.scss','.js']
  },
  devtool: devtool

};
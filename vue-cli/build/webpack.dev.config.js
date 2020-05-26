const path = require('path');

// 显示进程的完成进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 设置进度字体颜色
const chalk = require('chalk');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 分离css代码
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ip = require('ip').address();

//autoprefixer 插件 为css添加浏览器前缀 postcss-loader
const resolve = (dir) => path.join(__dirname, dir);

//全局引入变量
function resolveFromRootDir(name) {
    return path.resolve(__dirname, '../src/assets/css/' + name);
}
// 'cheap-module-source-map'
let cssLoader = [
    { loader: "style-loader", },
    { loader: "css-loader", },
    // 修改loader的配置
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
            ]
        }
    },


];


module.exports = {
    // mode: 'development',
    // entry: './src/main.js', //单个入口
    entry: {//多个入口
        app: ['./src/main.js'],
        // vendors: './src/vendors.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''//这个路径影响所有相对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve('src'),
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
                test: /\.vue$/,
                loader: 'vue-loader'
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
                use: [...cssLoader]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    ...cssLoader,
                    {
                        loader: "sass-loader",
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: [
                                resolveFromRootDir('varibles.scss'),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                include: resolve('../src'),
                use: {
                    loader: 'url-loader',
                    options: { // 配置参数
                        // 这种配置语法叫做：占位符
                        name: '[name]_[hash].[ext]', // 使用图片的名字，并使用图片的后缀
                        limit: 10960,
                        outputPath: 'assets/img',//path的显示名称 打包后图片存的文件夹
                        esModule: false
                    }
                }
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'react app1',
            filename: 'index.html',
            template: './index.html',
            // inject: true,
            chunks: ['manifest', 'vendor', 'app'],
            //第三个’app‘名称 要跟entry中的对应
            //vendor 是指提取涉及 node_modules 中的公共模块；
            //manifest 是对 vendor 模块做的缓存；

            // 压缩html代码默认有 自动判断环境是否执行 不用自己写
            // minify: {
            //   // 移除空格
            //   collapseWhitespace: true,
            //   // 移除注释
            //   removeComments: true
            // }
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
        new VueLoaderPlugin(),
        // 友好的终端错误显示方式
        new FriendlyErrorsPlugin({
            // 运行成功
            compilationSuccessInfo: {
                messages: ['你的应用程序在这里运行：',`http://${ip}:8080/`,'http://127.0.0.1:8080'],
                notes:['有些附加说明要在成功编辑时显示']
            },
            //  运行错误
            onErrors: function (severity, errors) {
                // 可以收听插件转换和优先级的错误
                // 严重性可以是'错误'或'警告'
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    // icon: ICON
                });
            },
            //是否每次编译之间清除控制台
            //默认为true
            clearConsole: true,
        }),

    ],
    //二、增加下列优化（增加css）
    // optimization: {
    //   minimizer: [new OptimizeCSSAssetsPlugin({})]
    // }
    //配置端口 //跑本地代码
    devServer: {
        publicPath: "",
        //contentBase: "./dist", // 服务启动在哪一个文件夹下
        open: false, // 启动服务时，自动打开浏览器
        port:8080, // 端口号
        // host:'0.0.0.0', 
        // proxy 跨域时模拟接口代理
        hot: true, // devServer开启Hot Module Replacement的功能
        hotOnly: false, // 即便HMP的功能没有生效，浏览器也不能自动刷新
        quiet: true,
        after() {
            console.log('');
        }, // 自定义中间件
        // proxy: { //配置多个跨域
        //   "/api": {
        //     target: "http://172.11.11.11:7071",
        //     changeOrigin: true,
        //     // ws: true,//websocket支持
        //     secure: false,
        //     pathRewrite: {
        //       "^/api": "/"
        //     }
        //   }

    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
        },
        extensions: [".js", '.vue', ".json", '.scss']
    },
    devtool: 'cheap-module-source-map'

};
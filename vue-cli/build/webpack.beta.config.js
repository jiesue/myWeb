const path = require('path');

// 显示进程的完成进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 设置进度字体颜色
const chalk = require('chalk');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 分离css代码
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const HtmlWebPackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    mode: 'development',
    // entry: './src/main.js', //单个入口
    entry: {//多个入口
        app: ['./src/main.js'],
        // vendors: './src/vendors.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''//这个路径影响所有相对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve('../src'),
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
        new copyWebpackPlugin([{
            from: resolve('../static'),// 打包的静态资源目录地址
            to: '../dist/static' // 打包到dist下面的static
        }]),
    ],
    //二、增加????????????????
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
        },
        extensions: [".js", '.vue', ".json", '.scss']
    },
    devtool: 'cheap-module-source-map'

};
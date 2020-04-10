const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReadmePlugin = require('./plugins/readme-plugin');
const  miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8*1024,
                    //关闭es6模块
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(css|js|html|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                },
            },
            {
                //字符串替换函数
                test: /\.html$/,
                loader: resolve(__dirname, './loaders/replace-loader.js')
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ReadmePlugin({
            template: resolve(__dirname, 'package.json')
        }),
        new miniCssExtractPlugin({
            filename: 'css/build.css'
        })
    ],
    //模式
    mode: "development",

    //服务器，无输出，只会在内存中打包
    //启动指令npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress:true,
        port:3000,
        open:true
    }
};

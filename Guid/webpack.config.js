const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
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
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
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
                    name: 'img/[name].[hash:10].[ext]',
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
                    name: '[name].[hash:10].[ext]',
                    outputPath: 'media'
                },
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: "html/index.html"
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

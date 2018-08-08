const path = require('path');
const base = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = merge(base, {
    output: {
        path: path.resolve(__dirname, '../../public/build'),
        filename: '[name].[hash].js',
        publicPath: '/public/build/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../public/views/index.html'),
            template: path.resolve(__dirname, '../../public/views/index.template.html'),
            inject: 'body',
            chunks: ['app'],
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        // contentBase: path.join(__dirname, "../../public/build"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
        publicPath: '/public/build/',
        proxy: {
            '!/public/build/': {
                target: 'http://localhost:3000/',
                // pathRewrite: { '^/public/build': '/public/build/'}
            }
        },
        inline: true,
        hot: true,
        port: 8080, //端口改为9000
        // open:true // 自动打开浏览器，适合懒人
    }
})
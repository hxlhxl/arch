const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './public/build'),
        filename: '[name].[hash].js',
        publicPath: 'public/build/'
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.html'
        ],
        alias: {

        },
        modules: [
            path.resolve('app'),
            path.resolve('node_modules')
        ]
    },
    node: {

    },
    module: {
        rules: [
        ]
    },
    optimization: {

    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './public/views/index.html')
        }]),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './public/views/index.html'),
            template: path.resolve(__dirname, './public/views/index.template.html'),
            inject: 'body',
            chunks: ['app'],
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new WriteFileWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}
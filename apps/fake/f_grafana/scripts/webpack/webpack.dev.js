const path = require('path');
const base = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
    output: {
        path: path.resolve(__dirname, '../../public/build'),
        filename: '[name].[hash].js',
        publicPath: '/public/build',
        hotUpdateChunkFilename: './hot/hot-update.js',
        hotUpdateMainFilename: './hot/hot-update.json',
    },
    plugins: [
        new CleanWebpackPlugin('../../public/build', {allowExternal: true}),
        new MiniCssExtractPlugin({
            filename: "grafana.[name].css"
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../public/views/index.html'),
            template: path.resolve(__dirname, '../../public/views/index.template.html'),
            inject: 'body',
            chunks: ['app'],
            // alwaysWriteToDisk: true
        }),
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/../../public/views/index.html',
        //     to: path.resolve(__dirname, '../../public/build/'),
        // }]),
        new HtmlWebpackHarddiskPlugin(),
        new WriteFileWebpackPlugin({
            test: /^(?!.*(hot)).*/,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 3991
        })
    ]
})
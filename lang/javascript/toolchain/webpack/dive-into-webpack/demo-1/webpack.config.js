const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// plugins
const HelloWebpackPlugin = require('./webpack/plugin/hello-webpack-plugin/');
const sassRuleLoader = require('./sass.rule')({
    sourceMap: process.env.WEBPACK_MODE === 'production' ? false : true, 
    minimize: false, 
    preserveUrl: false
})
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: false,
    context: path.join(__dirname, 'src'),
    entry: {
        index: path.join(__dirname, 'src', 'index.js'),
        home: path.join(__dirname, 'src', 'home.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    module: {
        // rules: [{
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader'],
        // }],
        rules: [
            {
                include: path.resolve("src"),
                sideEffects: false
            },
            {
                test: /\.(md)$/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash].[ext]'
                        }
                    }
                ]
            },
            sassRuleLoader,
        ]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         output: {
        //             comments: false,
        //         }
        //     }
        // })
        new HelloWebpackPlugin({}),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }),
        new webpack.NamedChunksPlugin(
            chunk => chunk.name || chunk.mapModules(m => path.basename(m.request, ".ts")).join("_"),
        ),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8887
        // }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        // minimize: false,
        // usedExports: true,
        minimizer: [
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         output: {
            //             comments: false
            //         },
            //         compress: {
            //             unsafe_comps: true,
            //             properties: true,
            //             keep_fargs: false,
            //             pure_getters: true,
            //             collapse_vars: true,
            //             unsafe: true,
            //             warnings: false,
            //             screw_ie8: true,
            //             sequences: true,
            //             dead_code: true,
            //             drop_debugger: true,
            //             comparisons: true,
            //             conditionals: true,
            //             evaluate: true,
            //             booleans: true,
            //             loops: true,
            //             unused: true,
            //             hoist_funs: true,
            //             if_return: true,
            //             join_vars: true,
            //             cascade: true,
            //             drop_console: true
            //         }
            //     }
            // }),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom|lodash|jquery)[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
};

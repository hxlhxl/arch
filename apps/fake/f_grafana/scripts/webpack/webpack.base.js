const path = require('path');
const sassRuleLoader = require('./sass.rule')({
    sourceMap: process.env.WEBPACK_MODE === 'production' ? false : true, 
    minimize: false, 
    preserveUrl: false
});

module.exports = {
    target: 'web',
    entry: {
        app: './app/index.ts',
        
    },
    output: {
        path: path.resolve(__dirname, '../../public/build'),
        filename: '[name].[hash].js',
        publicPath: 'public/build/'
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
            '.css',
            '.scss'
        ],
        alias: {
            'app': path.resolve(__dirname, '../../app'),
        },
        modules: [
            // 项目搜索模块路径
            path.resolve('./app'),
            path.resolve('node_modules')
        ]
    },
    node: {

    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                  {
                    loader: 'expose-loader',
                    query: 'jQuery'
                  },
                  {
                    loader: 'expose-loader',
                    query: '$'
                  }
                ]
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'tslint-loader',
                    options: {
                        emitErros: true,
                        typeCheck: false,
                        fix: true
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            sassRuleLoader,
            // {
            //     test: /\.scss$/,
            //     use: [
            //         "style-loader", // creates style nodes from JS strings
            //         "css-loader",   // translate CSS info CommonJS
            //         "sass-loader"   // compiles Sass to CSS
            //     ]
            // }
            {
                test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    optimization: {

    },
    plugins: [

    ]
}
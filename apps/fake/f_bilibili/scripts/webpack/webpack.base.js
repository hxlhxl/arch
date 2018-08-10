const path = require('path');

module.exports = {
    target: 'web',
    entry: {
        app: './app/index.ts'
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
        ],
        alias: {
            'app': path.resolve(__dirname, '../../app'),
        },
        modules: [
            // 项目搜索模块路径
            path.resolve('./'),
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
                        typeCheck: false
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
            }
        ]
    },
    optimization: {

    },
    plugins: [

    ]
}
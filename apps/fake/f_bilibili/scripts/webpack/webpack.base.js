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
            }
        ]
    },
    optimization: {

    },
    plugins: [

    ]
}
const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const app = express();


const hello = (req, res, next) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello response")
      res.write("hello");
      res.end();
    }, 10000);
  })
};

app.use('/hello', hello)

// webpack打包资源 web server
app.use(WebpackDevMiddleware(compiler, {
  // webpack-dev-middleware options
  publicPath: webpackConfig.output.publicPath,
  writeToDisk: true,
  // lazy: true
}));

// 服务端 __webpack_hmr 实现
app.use(WebpackHotMiddleware(compiler));

app.listen(3000, () => console.log('Example app listening on port 3000!'))


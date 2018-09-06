# server
## prerequirement(ArchLinux)
```
pacman -S mongodb
```

# client

## design

### css style

### color

- red
  `#FB617F`
  `#FFE0E6`
  `#FFFFFF`
- yellow
  `#FEB64D`
  `#FFF1DC`
  `#FFFFFF`
- blue
  `#4680FF`
  `#DBE5FF`
  `#FFFFFF`

## dependency
npm install --save-dev webpack
npm install --save-dev webpack-merge
npm install --save-dev webpack-dev-server
npm install --save-dev webpack-cli
npm install --save-dev html-loader
npm install --save-dev style-loader
npm install --save-dev css-loader
npm install --save-dev postcss-loader
npm install --save-dev node-sass
npm install --save-dev sass-loader
npm install --save-dev expose-loader
npm install --save-dev html-webpack-plugin
npm install --save-dev html-webpack-harddisk-plugin
npm install --save-dev clean-webpack-plugin
npm install --save-dev write-file-webpack-plugin
npm install --save-dev copy-webpack-plugin
npm install --save-dev webpack-bundle-analyzer
npm install --save-dev mini-css-extract-plugin
npm install --save-dev autoprefixer
npm install --save-dev postcss-reporter
npm install --save-dev postcss-browser-reporter
npm install --save-dev typescript
npm install --save-dev tslint-loader
npm install --save-dev tslint
npm install --save-dev ts-loader
npm install --save-dev nodemon
npm install --save jquery
npm install --save angular
npm install --save angular-route
npm install --save eventemitter3
npm install --save localforage

# development

```
npm run dev
npm run dev-server
client: http://localhost:8090/
server(api): http://localhost:3000/
```


# issues

1. github禁止client-only的oauth，必须要使用一个server搞定，暂时还没有写server部分，所以在err的时候，也会请求数据
  `Failed to load https://github.com/login/oauth/access_token: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://grafana.lilyzt.com:8090' is therefore not allowed access.`
2. `Invalid CSS after "": expected 1 selector or at-rule, was "var content = requi"`
   出现这个的原因在于scss应用了多个loader规则
3. [Uncaught RangeError: Maximum call stack size exceeded](https://github.com/webpack/webpack-dev-server/issues/87)
    webpack-dev-server的--hot选项和HotModuleReplacementPlugin有冲突
4. 
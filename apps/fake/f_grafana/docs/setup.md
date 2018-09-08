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
// 修改app_mode为development
npm run dev
npm run dev-server
client: http://localhost:8090/  []
server(api): http://localhost:3000/
```


# issues

1. github禁止client-only的oauth，必须要使用一个server搞定，暂时还没有写server部分，所以在err的时候，也会请求数据
  `Failed to load https://github.com/login/oauth/access_token: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://grafana.lilyzt.com:8090' is therefore not allowed access.`
2. `Invalid CSS after "": expected 1 selector or at-rule, was "var content = requi"`
   出现这个的原因在于scss应用了多个loader规则
3. [Uncaught RangeError: Maximum call stack size exceeded](https://github.com/webpack/webpack-dev-server/issues/87)
    webpack-dev-server的--hot选项和HotModuleReplacementPlugin有冲突
4. 在开发的时候，采用webpack-dev-server,这个时候如果修改css，页面虽然刷新了，但是没有发生变化。
   一番查询之后，发现index.html中的js链接没有发生变化，还是修改之前的js。
   首先猜测是服务器cache，全局搜索发现并没有
   再次猜测是客户端cache，但是注释了pkg/api/http_server.go中关于cache-control的内容后，仍然不生效
   接下来就是怀疑go-macaron框架的问题，然后查了半天一无所获。
   就在心灰意冷的时候，比较了一下grafana的代码，心想为啥会有webpack.dev.js，里面别无二致。
   最后，还是不甘心的时候，再仔细看了看cache-control部分的代码，看逻辑有setting.DEV这种，尝试修改配置文件，发现真成了。

   最后，我猜测是go-macaron框架自身会有默认的cache-control,只有在development显示覆盖不cache，才不会返回之前的内容.
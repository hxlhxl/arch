# git
CommitID: 72af8a70440761a470a9804fea5b367b0aff953c

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
npm install --save moment
npm install --save tether-drop


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
5. grafana中有一个不好的设计是static资源都使用public,这个不是特别的好，客户端可以随意知道前端的代码，所以这里自定义了其他的静态目录，相关代码在pkg/api/http_server.go的mapStatic部分。
   这里还有一点是，在开发环境下，webpack-dev-server所有的资源都是在/public/build下访问，所以即使是url()这种资源，也会以该路径为起始路径，所以为了最小化资源权限，font-awesome/_variables.scss以`../`表示tff等字体访问`/public/build/../**.ttf`，而http_server中建立`WEBROOT/app/fonts`静态资源的映射。

   app/img也是同样的道理需要静态资源服务
6. angularjs directive中controller和controllerAs的区别: https://stackoverflow.com/a/41825900
7. angularjs的directive中，如何在scope上注入service？
   这个问题在开发的时候大概阻塞了大半天，一般情况下，directive中的link函数中，是可以直接访问注入的service的，但是如果想要把service绑定到link中的scope上，就要在controller中注入，即`$scope.xSrv = srv`,因为这个directive受控于这个controller，所以在`$scope`上的注入会反映在link上.代码见`app\core\components\root\root.ts`。


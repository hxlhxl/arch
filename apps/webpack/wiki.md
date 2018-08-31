
# Plugins

## [html-webpack-plugin]()
## [html-webpack-harddisk-plugin]()
## [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)

- from  复制源
- to    复制目标，没有的时候，默认为webpack的output.path选项

注意：
    不要在`from`和`to`上使用`path.resolve`返回的路径，否则webpack会循环编译

## [write-file-webpack-plugin]()


## [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)

- publicPath
    webpack-dev-server打包的時候，是不認webpack.output.path選項的，默認把所有的js放在執行webpack-dev-server的根(/)路徑下，而且打包的输出也不会写在磁盘上，都会输出到在内存里。而publicPath的作用在于设置了之后，访问`/webpack-dev-server`可以看到一些webpack-dev-server的输出，但是这个时候，webpack的js资源只能使用`/[publicPath]/bundle.js`才能访问。
- contentBase
    webpack-dev-server在什么地方提供http服务
- 需要使用webpack-dev-server吗
    webpack-dev-server确实好用，但是我们真的需要吗，或者dev-server真的满足我们的需求吗？
    webpack-dev-server的本质作用就是给webpack打包出来的资源提供了HTTP服务，在某些复杂场景下，仅仅一个HTTP服务并不能满足开发需求，比如打包的html文件需要使用模板替换呢，或许存在插件作这种事情，但是多一个场景就需要一个对象的插件，所以，我们可以自己实现一个HTTP服务，来处理给客户端返回之前要做的一些工作。
    在单页面应用中，如果路由由前端处理，那么在客户端获得一个html文件之后，除非客户端显示地改变location这种情况，路由不是不会由HTTP服务器捕获的。所以，我们大可放心的自己实现HTTP服务。
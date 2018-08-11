
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
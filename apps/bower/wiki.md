从我介入前端的时间点来说，前端的那段黑暗历史对我来说很远。现在我们直接`webpack`,`babel`一套带走，而在没有`webpack`之前，`jser`是如何处理包管理的呢。
`bower`的主旨就是一个`package manager`，用来管理各种包的。
至于这些package如何使用，看开发者习惯和项目定位，可以直接使用`script标签`引入，可以结合其他tool使用，包括`grunt`,`gulp`等。
写道这里，我觉得没有继续写的必要了，因为现在`npm`接管了一切，`bower`的操作在有`npm`使用经验情况下，很简单。

- bower init
- bower list
- bower install <Package_Name> --save/--save-dev
- 
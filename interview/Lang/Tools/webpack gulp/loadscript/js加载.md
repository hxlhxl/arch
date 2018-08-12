
1. js按顺序加载，阻塞页面加载

遇到标签之后，阻塞页面，下载js，下载好之后执行，执行完毕之后，继续解析文档。

```
<script src="/a.js"></script>
<script src="/b.js"></script>
```

2. defer

js按顺序加载，页面不会阻塞,当文档解析完毕之后，执行这些js

```

<script defer src="/a.js"></script>
<script defer src="/b.js"></script>

```


3. async

js不会按顺序加载(异步加载)，页面不会阻塞，当js下载完成时，立即执行js，执行之后继续解析文档。

```

<script async src="/a.js"></script>
<script async src="/b.js"></script>

```


4. document.createElement('script')，相当于该标签拥有async属性。


js加载顺序不固定(异步加载)，允许跨域加载js，不会阻塞页面加载。js加载完成之后，立即执行。

```
var scriptElem = document.createElement(‘script’);
scriptElem.src = "/a.js";
scriptElem.type = "text/javascript";
document.getElementsByTagName(‘head’)[0].appendChild(scriptElem);

```

5. document.write('<script src="/a.js"></script>') 这种和直接在页面中写<script>标签效果一样。

```
document.write("<script type="text/javascript" src='A.js'></script>");
```



# 参考

[浏览器加载 JS 文件的先后顺序同具体的解析和执行有什么关系？ - 长天之云的回答 - 知乎](https://www.zhihu.com/question/20531965/answer/15418794)
[ 动态插入的script脚本执行时间](http://echizen.github.io/tech/2017/04-22-script-exec)
[在网页中异步加载javascript](http://foio.github.io/javascript-async/)
# 前端技能树

## HTML && CSS

- Web标准的理解
- 浏览器内核差异
- 兼容性
- hack
- CSS基本功：布局、盒子模型、选择器优先级
- HTML5
- CSS3
- Flexbox

## JavaScript

- 数据类型
- 运算
- 对象
- Function
- 继承
- 闭包
- 作用域
- 原型链
- 事件
- RegExp
- JSON
- Ajax
- DOM
- BOM
- 内存泄露
- 跨域
- 异步装载
- MVC
- MVVM
- 路由
- 模块化
- Canvas
- ES6
- Node.js

## 其他

- 移动端
- 响应式
- 自动化构建
- HTTP
- Web安全
- 优化
- 重构
- 可维护性
- SEO



# Web标准理解

# 浏览器内核差异

## 内核种类

- Gecko
- Webkit/blink
- Presto

## 内核理解

- 渲染引擎
- JavaScript引擎

#兼容性

# hack

# CSS基本功： 布局、盒子模型、选择器

## 布局

### 定位

position

- static

  元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分；行内元素则会创建一个或多个框，置于父元素中

- absolute

  元素框不再占有文档流位置，并且相对于包含块进行偏移(所谓的包含块就是最近一级外层元素position不为static的元素)

- relative

  元素框相对于之前正常文档流中的位置发生偏移，并且原先的位置仍然被占据。发生偏移的时候，可能会覆盖其他元素。

- fixed

  元素框不再占有文档流位置，并且相对于视窗进行定位

- inherit

- sticky

  (这是css3新增的属性值)粘性定位，官方的介绍比较简单，或许你不能理解。其实，它就相当于relative和fixed混合。最初会被当作是relative，相对于原来的位置进行偏移；一旦超过一定阈值之后，会被当成fixed定位，相对于视口进行定位。



### 偏移

作用在盒子对象上，而且这个对象的postion必须是`absolute`或者`relative`或者`fixed`时候才能生效，

​	如果作用在absolute上，而这些偏移是相对于其第一个position不是static的父容器位置的。

​	如果作用在relative上，而这些偏移是相对于其文档中正常位置左上角的偏移。

​	如果作用在fixed上，而这些偏移是相对于整个视窗的。

top

bottom

left

right



### 浮动

float元素之包含块：离浮动元素最近的块级父元素

float使用在元素上之后，会使元素成为 块级元素，可以在这个元素上设置width/height

- 元素浮动，元素脱离普通流
- 浮动会使得元素成为块级元素，这个元素可以使用width和height
- 元素宽度变为最小化自动调整
- 元素高度和float无关，总是最小化自动调整
- 一个元素浮动之后，并不会影响到正常的块级元素，而是对内联元素有影响
- 但是，如果一个元素浮动，而其父容器没有指定高度，那么与父容器相邻的元素可能会发生高度塌陷问题
- 元素float之后，其margin按照最近的靠近的盒子计算,元素float之后对border没有影响。

#### BFC block formatting context

块级格式上下文

如何理解BFC

```
  （W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
   一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
   不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。
```



如何触发BFC

```
- 根元素(html,body)
- float属性不为none
- position为absolute或者fixed
- display为inline-block、table-cell、table-caption、flex、inline-flex
- overflow不位visible时
```



BFC的影响

```
- 内部的Box会在垂直方向上一个接一个的放置

- Box垂直方向的距离由margin决定,属于同一个BFC的两个相邻Box的margin会发生重叠

    块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷(margin collapsing)，有的地方翻译为外边距合并。

    mdn通俗

    https://www.w3.org/TR/CSS2/box.html#collapsing-margins

        - 水平margin绝对不会collapse

        - 触发垂直margin collapse的条件

            a、 both belong to in-flow block-level boxes that participate in the same block formatting context

            b、 no line boxes, no clearance, no padding and no border separate them (Note that certain zero-height line boxes (see 9.4.2) are ignored for this purpose.)

            c、 both belong to vertically-adjacent box edges

    https://blog.lwxyfer.com/margin-bfc/

    https://www.zhihu.com/question/19823139

- 每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的formatting，否则相反)。即使存在浮动也是如此。

    就是子元素会按照顺序填充父容器咯。

- BFC的区域不会与float box重叠

    就是说BFC能够和float box在同一个容器中并排排列；通过触发元素的BFC可以实现某些布局。

- BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

    因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。

- 计算BFC高度时，浮动元素也参与计算

    就是说如果一个BFC容器中存在浮动元素，那么浮动子元素的高度会参与BFC容器的计算

```



#### 清除浮动

```

<div>
	<div class="left">aaaa</div>
	<div class="left">bbbb</div>
	<div class="left">ccccc</div>
	<div class="clearfix"></div>
</div>
float脱离文档流，导致父容器高度塌陷，使用额外的clear:both，底层通过在清除浮动的元素上下添加足够的空间，让父容器有正确的高度.
```



```
// 现代浏览器clearfix方案，不支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

// 全浏览器通用的clearfix方案
// 引入了zoom以支持IE6/7
.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

// 全浏览器通用的clearfix方案【推荐】
// 引入了zoom以支持IE6/7
// 同时加入:before以解决现代浏览器上边距折叠的问题
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```



ie浏览器下如何清除浮动？

```
  清除浮动，触发hasLayout；
  Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。
  譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。

  来龙去脉大概如下：
  当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

  Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。

  目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
  可以通过css3里面的动画属性scale进行缩放。
```



### 尺寸



### 布局例子



#### 两栏布局

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .left {
            width: 200px;
            height: 600px;
            background: red;
            float: left;
            display: table;
            text-align: center;
            line-height: 600px;
            color: #fff;
        }

        .right {
            margin-left: 210px;
            height: 600px;
            background: yellow;
            text-align: center;
            line-height: 600px;
        }
    </style>
</head>

<body>
    <div class="left">定宽</div>
    <div class="right">自适应</div>
</body>

</html>
```



#### 三栏布局

1. **使用左右两栏使用float属性，中间栏使用margin属性进行撑开，注意的是html的结果**

   缺点：`缺点是：1. 当宽度小于左右两边宽度之和时，右侧栏会被挤下去；2. html的结构不正确`

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
.left{
    width: 200px;height: 300px; background: red; float: left;    
  }
  .right{
    width: 150px; height: 300px; background: green; float: right;
  }
  .middle{
    height: 300px; background: yellow; margin-left: 220px; margin-right: 160px;
  }
    </style>
</head>

<body>
        <div class="left">左栏</div>
        <div class="right">右栏</div>
        <div class="middle">中间栏</div>
</body>

</html>
```



2. **使用position定位实现，即左右两栏使用position进行定位，中间栏使用margin进行定位**

优缺点`好处是：html结构正常。缺点时：当父元素有内外边距时，会导致中间栏的位置出现偏差`

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
.left{
    background: red;
    width: 200px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
}
.middle{
    height: 300px;
    margin: 0 220px;
    background: yellow;
}
.right{
    height: 300px;
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    background: green;
}
    </style>
</head>

<body>
        <div class="left">左栏</div>
        <div class="middle">中间栏</div>
        <div class="right">右栏</div>
</body>

</html>
```



3. flex布局

   优缺点： `除了兼容性，一般没有太大的缺陷`



```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
.wrapper{
    display: flex;
}
.left{
    width: 200px;
    height: 300px;
    background: red;
}
.middle{
    width: 100%;
    background: yellow;
    marign: 0 20px;
}
.right{
    width: 200px;
    height: 3000px;
    background: green;
}
    </style>
</head>

<body>
        <div class="wrapper">
                <div class="left">左栏</div>
                <div class="middle">中间</div>
                <div class="right">右栏</div>
            </div>
</body>

</html>
```





#### website常见布局

##### quanmintv pc

```

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
body {
    width: 100%;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}
div {
    margin: 0;
    padding: 0;
}
.main_header {
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 6px 20px rgba(0,0,0,.1);
    min-width: 1000px;
    transform: translate3d(0,0,0);
}
.common_w-header {
    width: 1000px;
    margin: 0 auto;
    background-color: yellowgreen;
    height: 100%;
}
/* 导航菜单浮动容器 */
.common_w-header_nav {
    /* float: left; */
    height: 100%;
    position: relative;
}
.common_w-header_logo  {
    float: left;
    width: 116px;
    height: 100%;
    display: block;
    padding-right: 25px;
    background: url(//static.quanmin.tv/public/common/view/widget/header/img/logo_33037c7.svg) no-repeat 0 center;
    text-indent: -99999em;
}
.title {

}
.common_w-header_logo_a {
    height: 100%;
    display: block;
    /* text-indent: -2000px; */
}
.common_w-header_logo-img {
    position: absolute;
    top: 0;
    left: -9999em;
}
.main_body {
    z-index: 100;
    position: relative;
    top: 50px;
    left: 0;
    background-color: bisque;
    height: 1000px;
}
.main_page {
    position: relative;
    margin-left: 0;
}
.index_p-home {
    background: #f4f4f4;
    min-width: 1000px;
    font-size: 12px;
}
.index_p-home_hotlive {
    background: #fff;
    margin-top: 20px;
    padding: 15px 12px 0;
}
.index_p-home_content {
    width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    height: 300px;
}
/* 清除浮动 */
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.index_p-home_bottom_footer {
    background: #222;
}
.common_w-footer {
    margin: 0 auto;
    color: #636466;
    text-align: center;
    font-size: 14px;
    line-height: 2.4;
    height: 140px;
    padding-top: 40px;
    padding-bottom: 40px;
    background: #222 url(//static.quanmin.tv/public/common/view/widget/footer/img/img_home_foot_bg_439019f.png) repeat-x 0 0;
}

.common_w-header_link-outer {
    float: left;
    height: 100%;
    box-sizing: border-box;
}
/* 对每个nav项进行浮动,而且使用居中这种东西 */
.common_w-header_link_wrap{
    position: relative;
    float: left;
    margin-right: 10px;
    border-radius: 2px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
} 
.common_w-header_link_selected {

}
    </style>
</head>

<body>
        <div id="main" class="main">
                <div class="main_header">
                    <div class="common_w-header">
                        <div class="common_w-header_nav clearfix">
                                <h1 class="common_w-header_logo title" title="全民直播 - 做年轻人爱看的直播">
                                        <a href="//www.quanmin.tv/" data-log-info="{&quot;c&quot;:&quot;header&quot;,&quot;v1&quot;:&quot;logo&quot;,&quot;evtvalue&quot;:&quot;logo&quot;,&quot;evtname&quot;:&quot;全民直播logo&quot;}" class="common_w-header_logo_a" data-log-zhuge="{&quot;name&quot;:&quot;头部--全民logo按钮--点击&quot;}">
                                            全民直播 - 做年轻人爱看的直播
                                          <img src="//static.quanmin.tv/public/common/view/widget/header/img/logo_12efde8.png" alt="全民直播" class="common_w-header_logo-img">
                                        </a>
                                </h1>
                                <div class="common_w-header_link-outer">
                                    <div class="common_w-header_link_wrap common_w-header_link_selected">首页</div>
                                    <div class="common_w-header_link_wrap common_w-header_link_selected">直播</div>
                                    <div class="common_w-header_link_wrap common_w-header_link_selected">分类</div>
                                    <div class="common_w-header_link_wrap common_w-header_link_selected">娱乐</div>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="main_body">
                    <div class="main_page">
                        <div class="main_inner">
                            <div class="index_p-home">
                                <!-- 实时推荐 -->
                                <div class="index_p-home_recommendlive"></div>
                                <!-- 内容主题，版心直接通过margin； 0 auto实现，其宽度固定 -->
                                <div class="index_p-home_hotlive index_p-home_content clearfix">

                                </div>
                            </div>
                            <!-- footer,整体黑色，通过w-footer控制的宽度 -->
                            <div class="index_p-home_bottom_footer">
                                <div class="common_w-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">右栏</div>
            </div>
</body>

</html>

```



##### quanmintv mobile



```
采用rem布局
```



## 垂直居中





### 垂直(垂直居中)

- 父元素高度确定

  - 单行文本、行内元素

    - `line-height=height`

  - 多行文本、图片、块级元素

    - CSS3，父元素使用relative或者absolute，子元素使用`position:relative;left:50%;top:50%`,在这个作用下，子元素左顶点会处于中间位置；然后子元素使用`transform:translate(-50%,-50%)`，表示元素现对于自身宽高反方向移动50%，二者一作用就是居中了。


    - 父元素使用`display:table-cell;vertical-align:middle`

- 父元素高度不确定

  - 子元素使用`padding-top = padding-bottom`,这样就居中了。和那个margin的原理类似。

### 居中(水平居中)

- 行内元素
  - 父容器不管有没有高度，只要使用`text-align:center`，那么行内子元素始终按照父元素居中
- 块级元素
  - 定宽块级元素
    - 直接使用`margin:0 auto`，这样该元素左右会自动相同，达到居中的效果；背后的原理是块级元素的宽度计算，如果width:auto，那么margin直接为0；如果指定width，那么margin:auto，二者相等。
  - 不定宽块级元素
    - 父容器`text-align:center`，子元素`display:inline`，直接使用行内元素的居中策略
    - 父元素`position:relative;left:50%`，子元素`position:relative;left:-50%`，原理在于父容器相对于其正常位置50%，子元素相对于父元素-50%，二者这样一搞，直接就到正确的位置了。
    - 把不定宽容器放到table的td中，然后table设置`margin: 0 auto`



### 垂直居中

- flex

  ```
  .container {
    display:flex;
    align-items:center;
    justify-content:center;
  }
  <div class="container">
  	<div class="item"></div>
  </div>
  ```

- css3

  ```
  .item {
    position:relative;
    top:50%;
    left:50%;
    trasform:translate(-50%,-50%); // translateX(-50%),translateY(-50%)
  }
  ```

  ​







## 盒子模型

模型： content + padding + border + margin

W3C:  content

IE6-8: content = content + padding+ border

在设置content高度和宽度的时候，二者表现不一样。

## box-sizing

box-sizing: content-box | border-box | inherit

`content-box`，默认属性，遵从标准盒模型。 
`border-box`，是使用IE盒模型。 
`inherit`，继承父类的box-sizing属性值。

## 选择器

- id选择器

- 类选择器

- 元素选择器

- 伪类选择器

  ```
  :active
  :hover
  :focus
  :link
  :visited
  :first-child
  :last-child
  :nth-child
  :before
  :after 元素之前或者之后添加元素
  ::after
  ::before	伪元素CSS3
  :checked 单选框或复选框被选中
  input:focus {
    background-color: yellow;
  }
  li:first-child {
    
  }
  li:last-child {
    
  }
  li:nth-child(2) {
    color:red;
  }
  table tr:nth-child(even) {
      background-color: red;
  }
  table tr:nth-child(odd) {
      background-color: green;
  }
  table tr:nth-child(4n+1) {
      background-color: green;
  }
  table tr:nth-child(4n+2) {
      background-color: red;
  }
  table tr:hover {
      background-color: white;
      cursor: pointer;
  }
  ```

  ​

- 属性选择器 a[name='test']

  ```
  <a name="text">jump</a>
  ```

  ​

- 以上各种组合

  - 子选择器ul > li,表示ul必须是li的第一个父元素的时候，该选择器生效

    ```
    <ul>
    	<li>a</li>
    	<li>b</li>
    </ul>
    ```

  - 后代选择器 li a,表示li下面所有的a

  - 通配符选择器 *

  - 相邻选择器 h1 + p,表示h1相邻的p元素



## 选择器优先级

- 就近原则

  同权重就近

- 载入样式后以最后载入的为准

- 内联样式 > 嵌入样式 > 引入样式

- !important > id > class > tag

### 选择器权重规则

标签权重为 1

class权重为 10

id权重为 100



## link && @import

``` 
<link href="/a.css" rel="stylesheet" />
<style>
@import "style.css";
@import url("style.css");
</style>
```

link除了加载css还可以加载别的文件，可以使用rel(relation)

import只能加载css文件，而且**import规则一定要先于除了@charset的其他任何CSS规则**，只有这样才会发出网络请求请求import进来的css。

## 媒体查询

```
@media(min-width:700px) {
  // ...
}
```

## 预处理器 后处理器

```
  - 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
    还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

  - 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
    是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。
```



# HTLM

## DOCTYPE

```
- <!DOCTYPE>声明位于位于HTML文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
- 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。
- DTD
	html5不属于SGML(Standard Generalized Markup Language )
```

## 行内元素、块级元素

[你不知道的margin属性](http://louiszhai.github.io/2016/03/23/css-margin/#margin%E6%98%AF%E5%90%A6%E5%AF%B9%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0%E7%94%9F%E6%95%88)

- 块级元素

  div p ul ol li h1-h5 

- 行内元素: width/height无效；margin左右有效，上下无效；border无效、padding左右有效，上下无效；使用font-size和line-height改变其高度

  a b span strong

- 其他

  inline-block有着inline和block的双重属性，因此可以使用高度和宽度

  select chrome中默认为inline-block

  input chrome中默认为inline-block

  img replace inline element,划分在inline-block，可以设置width和height，margin、border和padding

## HTML5

```
* HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
  	  绘画 canvas;
  	  用于媒介回放的 video 和 audio 元素;
  	  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
        sessionStorage 的数据在浏览器关闭后自动删除;
  	  语意化更好的内容元素，比如 article、footer、header、nav、section;
  	  表单控件，calendar、date、time、email、url、search;
  	  新的技术webworker, websocket, Geolocation;

    移除的元素：
  	  纯表现的元素：basefont，big，center，font, s，strike，tt，u;
  	  对可用性产生负面影响的元素：frame，frameset，noframes；

  * 支持HTML5新标签：
  	 IE8/IE7/IE6支持通过document.createElement方法产生的标签，
    	 可以利用这一特性让这些浏览器支持HTML5新标签，
    	 浏览器支持新标签后，还需要添加标签默认的样式。

       当然也可以直接使用成熟的框架、比如html5shim;
  	 <!--[if lt IE 9]>
  		<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
  	 <![endif]-->

  * 如何区分HTML5： DOCTYPE声明\新增的结构元素\功能元素
```



## 语义化

```
用正确的标签做正确的事情。
  html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
  即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
  搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
  使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
```

## cookie/sessionStorage/localStorage

```
  cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
  cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
  sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

  存储大小：
  	cookie数据大小不能超过4k。
  	sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

  有期时间：
  	localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
  	sessionStorage  数据在当前浏览器窗口关闭后自动删除。
  	cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭	
```



## label标签

```
  label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

  <label for="Name">Number:</label>
  <input type=“text“name="Name" id="Name"/>

  <label>Date:<input type="text" name="B"/></label>
```



## 页面间通讯

```
  WebSocket、SharedWorker；
  也可以调用localstorge、cookies等本地存储方式；

  localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
  我们通过监听事件，控制它的值来进行页面信息通信；
  注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；
```



# CSS3

## css3新特性

```
    新增各种CSS选择器	（: not(.input)：所有 class 不是“input”的节点）
    圆角		    （border-radius:8px）
    多列布局	    （multi-column layout）
    阴影和反射	（Shadow\Reflect）
    文字特效		（text-shadow、）
    文字渲染		（Text-decoration）
    线性渐变		（gradient）
    旋转		 	（transform）
    缩放,定位,倾斜,动画,多背景
    例如:transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:
```



# Flexbox

```
一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
   较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
   采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。
   它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
   常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做局中，能对不同屏幕大小自适应。
   在布局上有了比以前更加灵活的空间。

   具体：http://www.w3cplus.com/css3/flexbox-basics.html
```



# XMLHttpRequest

关键点： 线程/回调/异步

​    Ajax告诉浏览器我要发送一个请求，浏览器新开一个线程去执行这个请求，当请求完成的时候，ajax会有对应的回调函数去响应它，而js可以继续执行，也就是异步。

  详细： XMLHttpRequest

​    XMLHttpRequest是一个API,它为客户端提供了客户端和服务器之间传输数据的功能。它提供了一个通过URL来获取数据的简单方式,并且不会使整个页面刷新。XMLHttpRequest在AJAX中大量使用。

​    XMLHttpRequest是一个JavaScript对象，最初由Microsoft设计，支持HTTP，file和FTP协议。

​    继承关系：

​      EventTarget <-  XMLHttpRequestEventTarget <-  XMLHttpRequest

​    属性：(在new XMLHttpRequest实例之后，这个实例拥有的一些属性)

​      onreadystatechange

​        一个JavaScript函数对象，当readyState属性改变时会调用它。回调函数会在user interface线程中调用。

​      readyState

​        @1. 0 UNSENT  (未打开) open()方法还未被调用.

​        @2. 1 OPENED  (未发送) send()方法还未被调用.

​        @3. 2 HEADERS_RECEIVED (已获取响应头) send()方法已经被调用, 响应头和响应状态已经返回.

​        @4. 3 LOADING (正在下载响应体) 响应体下载中; responseText中已经获取了部分数据.

​        @5. 4 DONE (请求完成)   整个请求过程已经完毕.

​      response

​        响应实体的类型由 responseType 来指定， 可以是 ArrayBuffer， Blob， Document， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 null。

​      responseText

​        此次请求的响应为文本，或是当请求未成功或还未发送时为 null。只读。

​      responseType

​        设置该值能够改变响应类型。就是告诉服务器你期望的响应格式。

​        @1. "" (空字符串) 字符串(默认值)

​        @2. "arraybuffer" ArrayBuffer

​        @3. "blob"    Blob

​        @4. "document"    Document

​        @5. "json"    JavaScript 对象，解析自服务器传递回来的JSON 字符串。

​        @6. "text"    字符串

​      responseXML

​        本次请求的响应是一个 Document 对象，如果是以下情况则值为 null：请求未成功，请求未发送，或响应无法被解析成 XML 或 HTML。当响应为text/xml 流时会被解析。当 responseType 设置为"document"，并且请求为异步的，则响应会被当做 text/html 流来解析。只读.

​      status:

​        该请求的响应状态码 (例如, 状态码200 表示一个成功的请求).只读.

​      statusText

​        该请求的响应状态信息,包含一个状态码和原因短语 (例如 "200 OK"). 只读.

​      upload

​        可以在 upload 上添加一个事件监听来跟踪上传过程。

​      withCredentials

​        表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。

​    方法：

​      abort()

​        如果请求已经被发送,则立刻中止请求。

​      open()

​        初始化一个请求. 该方法用于JavaScript代码中;如果是本地代码, 使用 openRequest()方法代替.

​        签名如下：

​        ```

​          void open(

​             DOMString method,  // 请求所使用的HTTP方法; 例如 "GET", "POST", "PUT", "DELETE"等. 如果下个参数是非HTTP(S)的URL,则忽略该参数.

​             DOMString url, //该请求所要访问的URL

​             optional boolean async,//一个可选的布尔值参数，默认为true,意味着是否执行异步操作，如果值为false,则send()方法不会返回任何东西，直到接受到了服务器的返回数据。如果为值为true，一个对开发者透明的通知会发送到相关的事件监听者。这个值必须是true,如果multipart 属性是true，否则将会出现一个意外。

​             optional DOMString user,//用户名,可选参数,为授权使用;默认参数为空string

​             optional DOMString password//密码,可选参数,为授权使用;默认参数为空string.

​          );

​        ```

​    

​      overrideMimeType

​        重写由服务器返回的MIME type。这个可用于, 例如，强制把一个响应流当作“text/xml”来处理和解析,即使服务器没有指明数据是这个类型。注意，这个方法必须在send()之前被调用。

​      send()

​        发送请求. 如果该请求是异步模式(默认),该方法会立刻返回. 相反,如果请求是同步模式,则直到请求的响应完全接受以后,该方法才会返回.

​      setRequestHeader()

​        给指定的HTTP请求头赋值.在这之前,你必须确认已经调用 open() 方法打开了一个url.

```
 javascript

var xhr = new XMLHttpRequest();

xhr.open('GET','/api/v1/user');

xhr.send(null)

xhr.onreadystatechange = function() {

    var DONE = 4;   // 4代表已经向服务器发送了请求

    var OK = 200;

    if (xhr.readyState === DONE) {

        if (xhr.status === OK) {

            console.log(xhr.responseText);  // 返回文本

        } else {

            console.log('error',xhr.status);

        }

    }

}

```



```


amd xhr

;(function(root,factory) {

  if (typeof define === 'function' && define.amd) {

    define([],factory);

  } else {

    root.xhr = facotry;

  }

})(this,function() {  // global env this === window

  function createXhr(callback) {

    if (callback && typeof callback !== 'function') {

      throw new Error('callback is not callable');

    }

    var xhr;

    if (window.XMLHttpRequest) {

      xhr = new XMLHttpRequest();

    } else {

      xhr = new ActiveXObject('Microsoft.XMLHTTP');

    }

    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

    if (callback) {

      xhr.onreadystatechange = function() {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {

            var contentType = xhr.getResponseHeader('Content-Type');

            if (contentType === 'application/json') { // 处理json API返回

              try {

                callback(null,JSON.parse(xhr.responseText));

              } catch(e) {

                callback(e.message, null, xhr);

              }

            } else {  // 处理非json api返回

              callback(null, xhr.responseText, xhr);

            }

          } else {  // 处理状态码非200情况

            callback(xhr.statusText,null,xhr);

          }

        }

      }

      return xhr; // 返回xhr对象

    }

    return {

      request: function(options) {

        if (!options.uri) {

          throw new Error('no uri has been provided');

        }

        var data = options.data || null,

            method = options.method || 'GET',

            callback = options.callback || null;

        if (['GET','POST','PUT','DELETE'].indexOf(method) === -1) {

          throw new Error('invalid request method:' + method);

        }

        var xhr = createXhr(callback);

        xhr.open(method,options.uri,true);

        if (data) {

          xhr.setRequestHeader('Content-Type',(typeof data === 'string') ? 'application/json' : 'application/x-www-form-urlencoded');

        }

       xhr.send(data);

      },

      get: function(uri, callback) {

        this.request({uri,callback});

      },

      post: function(uri,data,callback) {

        if (typeof data === 'function') {

          callback = data;

          data = null;

        }

        this.request({uri,data,callback,method: 'POST'});

      }

    }

  }

})



```



# JavaScript

## 模块化

### Commonjs

```
CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}
```



### AMD

```
define(id?, dependencies?, factory);
```



### CMD

seajs



## 数据类型

基本类型： Undefined、Null、Boolean、Number、String、Symbol

内置对象： Object、Array、Boolean、Number、String、Function、Math、Date、RegExp、Error

内存布局：基本类型分配在栈空间上，而引用类型分类在堆空间上，栈上保存着引用类型的指针。因为栈空间小，而堆空间大。



## 原型链

每个对象都会在其内部初始化一个属性，就是prototype，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，他就会去prototype中去寻找这个属性，这个prototype又会有自己的prototype，于是就是所说的原型链概念。

```
instance.__proto__ === instance.Constructor.prototype	
```



# Web API

## Event Model

JavaScript采用异步事件驱动编程模型，简单点就是JavaScript通过浏览器提供的时间模型API和用户产生交互。

### 事件绑定

#### DOM元素直接绑定

```
<div onclick="alert(2)"></div>
​```

​```
<div onclick="myalert(2)"></div>
<script>
    function myalert(str) {
        alert(str);
    }
</script>
```



#### JS代码绑定

缺点： 在同一个ele上绑定相同事件会被覆盖，必须自定义绑定函数，判断之前有么有绑定，很麻烦

```
<div id="btn"></div>

ele = document.getElementById("btn");
ele.onClick = function() {
    // this指向DOM元素
    alert("hello world")
}
```



#### JS事件监听【现代标准绑定】

ele.addEventListener(event,handler,useCapture);

\- ele: DOM元素

\- event: 事件类型

\- handler: 事件回调

\- useCapture: 是否使用捕获，一般为false

```
function addEvent(target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler, false);
        } else {
            target.attachEvent('on' + type, function() {
                // ie中this指向了window，这里使用call修正
                return handler.call(target)
            });
        }
    }
```

#### 例子

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
<script src="https://code.jquery.com/jquery-3.0.0.js"></script>
  <title>JS Bin</title>
</head>
<body>
<a href="javascript:alert(1)" onclick="alert(2)" id="link">click me</a>
<script>
    var link = document.getElementById('link');
    link.onclick = function() { alert(3); }

    $('#link').bind('click', function() { alert(4); });
    $('#link').bind('click', function() { alert(5); });
</script>
</body>
</html>

// 3 4 5 1
```



### 默认事件

```
event.preventDefault()
```



### 事件冒泡

大部分事件会沿着事件触发的目标元素往上传播。比如：body>div>p>span 如果他们都注册了点击事件，那么在 span 元素上触发点击事件后 p,div,body 各自的点击事件也会按顺序触发。

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
<script src="https://code.jquery.com/jquery-3.0.0.js"></script>
  <title>JS Bin</title>
</head>
<body>
<div id="div">
  <p id="p">点我</p>
</div>
<script>
    document.body.onclick = function(){
      alert('body');
    }
    document.getElementById("div").onclick = function() {
      alert('div');
    }
    document.getElementById("p").onclick = function() {
      alert('p');
    }
</script>
</body>
</html>
```



#### 阻止事件冒泡

```
function stopPropagation(event) {
        event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {// IE
            event.cancelBubble = true
        }
    }
```



### 事件对象

标准浏览器中在事件处理程序被调用时 事件对象 会通过参数传递给处理程序，IE 8 及以下浏览器中事件对象可以通过全局的 window.event 来访问。比如我们要获取当前点击的 DOM Element

```
<script>
    addEvent(document, 'click', function(event) {
        // IE 8 以下 => undefined
        console.log(event);
    });
    // 兼容
    addEvent(document, 'click', function(event) {
        event = event || window.event;
        // 标准浏览器 => [object HTMLHtmlElement]
        // IE 8 以下 => undefined
        console.log(event.target);
        var target = event.target || event.srcElement;

        console.log(target.tagName);
    });
</script>
```



### 事件代理

Event Delegation的原理在于事件冒泡,对于动态生成的元素绑定事件比较有用。

```
<ul id="list"></ul>
<script>
function delegateEvent(el, eventType, fn) {
    addEvent(el, eventType, function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        fn(target);
    });
}

var el = document.getElementById('list');
// 用 setTimeout 模拟 Ajax 伪代码
setTimeout(function() {
    var ajaxData = '<li id="item-1">item1</li> <li id="item-2">item2</li> <li id="item-3">item3</li> <li id="item-4">item4</li> <li id="item-5">item5</li>';
    el.innerHTML(ajaxData)
}, 1000);

delegateEvent(el, 'click', function(target) {
    console.log(target.id);
});
</script>
```

### 任务队列

据whatwg规范介绍：

一个事件循环(event loop)会有一个或多个任务队列(task queue)

每一个 event loop 都有一个 microtask queue

task queue == macrotask queue != microtask queue

一个任务 task 可以放入 macrotask queue 也可以放入 microtask queue 中

调用栈清空(只剩全局)，然后执行所有的microtask。当所有可执行的microtask执行完毕之后。循环再次从macrotask开始，找到其中一个任务队列执行完毕，然后再执行所有的microtask，这样一直循环下去



![浏览器事件循环](https://pic4.zhimg.com/50/v2-625308b43e94d35a9a1367cc5ebafe2e_hd.jpg)

# React

## 生命周期

组件

​	getDefaultProps

​	getInitialState

​	componentWillMount

​	render

​	componentDidMount

​		running

​		|			\

componentWillReceiveProps(nextProps)		|	\

​		|		/			\

​			|					\

​		shouldComponentUpdate   --\

​			|

​		componentWillUpdate(nextProps,nextState)

​			|

​		componentDidUpdate(prevProps, prevState)		-----------\

​	|

componentWillUnmount



## 什么时候发送异步请求

constructor

componentWillMount

componentDidMount

最好总是在componentDidMount阶段发送异步请求，有两个原因

1. SSR的时候，componentWillMount就会调用一次，此时发送请求可能并不是我们想要的
2. componentWillMount调用会导致第一次渲染的时候，数据还没有拿到组件中来，可能渲染出一些错误；这里也就是不管是componentWillMount还是componentDidMount都需要好好的写好Default Props或者initial State。



## defaultProps initialState



使用defaultProps的方式

```

// 方式一
static defaultProps = {
  items: []
}

// 方式二
render() {
  const {items = []} = this.props;
}
// 方式三,组件默认 参数zhi
function ItemList = function({items = []}) {
  return (
  )
}

```



使用state的方式

```
constructor(props) {
  super(props);
  this.state = {
    // ...
  }
}

// 方式二
class C extends React.Component {
  state = {
    // ...
  }
}

```

## setState之后发生了什么

在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

setState第二参数是一个回调函数

## Functional Component/Class Component

在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。

## 高阶组件

## refs

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加ref属性然后在回调函数中接受该元素在 DOM 树中的句柄。

有两种方式声明

```
<div ref="mydiv"></div>
// 方式二
<div ref={d => this.mydiv = d}></div>
```



## keys

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。



## 回调渲染模式（Render Callback Pattern）

父组件render方法中可以调用 this.props.children，从而在父组件中访问子组件





## Controlled Component 与 Uncontrolled Component





受控组件（Controlled Component）代指那些交由 React 控制并且所有的表单数据统一存放的组件。通过调用setState函数进行修改。



而非受控组件（Uncontrolled Component）则是由DOM存放表单数据，并非存放在 React 组件中。我们可以使用 refs 来操控DOM元素。



## shouldComponentUpdate 的作用是啥



shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。



## React生产环境

通常情况下我们会使用 Webpack 的 DefinePlugin 方法来将 NODE_ENV 变量值设置为 production。编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息。



## React.Children.map

父组件的子元素不止一个，如果为一个返回对象，如果为多个返回数组，而React.Children.map已经为这两种情况作了兼容。



## React事件逻辑

为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。



## createElement\cloneElement



## 服务端渲染

正常请求

​	client

​		-> html

​			-> js/css

​				-> ajax

​					-> render

react正常请求： 1.请求一个html -> 2. 服务端返回一个html -> 3. 浏览器下载html里面的js/css文件 -> 4. **等待**js文件下载完成 -> 5. 等待js加载并初始化完成 -> 6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch ) -> 7. 等待后端数据返回 -> 8. react-dom( 客户端 )**从无到完整**地，把数据渲染为响应页面

react服务端渲染： 1. 请求一个html -> 2. 服务端请求数据( 内网请求快 ) -> 3. 服务器初始渲染（服务端性能好，较快） -> 4. 服务端返回**已经有正确内容**的页面 -> 5. 客户端请求js/css文件 -> 6. **等待**js文件下载完成 -> 7. 等待js加载并初始化完成 -> 8. react-dom( 客户端 )把剩下一部分渲染完成( 内容小，渲染快 )

​	服务端可见部分 initProps -> initState -> componentWillMount -> render



## MVVM



# Webpack

entry

output

​	path

​	publicPath

​	filename

module

​	rules/loader

​		jsx babel-loader

​		css、scss	style-loader|css-loader|sass-loader

​		png、gif	url-loader

​		woff、ttf	url-loader

plugins

​	webpack-md5-hash

​	webpack.optimize.CommonsChunkPlugin

​	webpack.ProvidePlugin	源码中可以直接使用定义的符号

​	CopyWebpackPlugin

​	HtmlWebpackPlugin

​	webpack.DefinePlugin	根据环境打包 prod dev

​	webpack.HotModuleReplacementPlugin

​	webpack.optimize.UglifyJsPlugin

resolve/alias

# HTTP

## cookie隔离

```
  如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
  所以不如隔离开。

  因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
  这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

  同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
  提高了webserver的http请求的解析速度。
```



## 缓存

![google dev cache ](http://jbcdn2.b0.upaiyun.com/2017/10/c0306673e0b62313a6002b9658bcac87.jpg)

### 强缓存

​	expires： 缓存在什么时候过期

```
Expires:Wed, 10 Jan 2018 16:00:53 GMT
```



​	cache-Control

​		max-age 指定一个时间长度，在这个时间段内缓存是有效的，单位是s。例如设置 Cache-Control:max-age=31536000，也就是说缓存有效期为（31536000 / 24 / 60 * 60）天，第一次访问这个资源的时候，服务器端也返回了 Expires 字段，并且过期时间是一年后。

​		 **public** 表明响应可以被任何对象（发送请求的客户端、代理服务器等等）缓存。

​		 **private** 表明响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。

​		**no-cache** 强制所有缓存了该响应的用户，在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存。

​		**no-store** 禁止缓存，每次请求都要向服务器重新获取数据。

```
Cache-Control:max-age=300	表示3分钟过期，和上面Expires一直，上面是标准时间，东八区-8小时
```



### 协商缓存

​	last-modified/if-modified-since

​	last-modified作为响应头，if-modified-since作为请求头，在下次请求的时候带上这个时间，服务器会和这个时间作比较，如果时间不一样，服务器会返回新内容，http code 200；否则的话，命中缓存，服务器返回304	

```
Last-Modified:Fri, 18 Jul 2014 00:23:43 GMT
```



​	etag/if-none-match

​	etag作为响应头，是服务器对该资源算出的一个hash值，在下次请求的时候带上这个etag的值作为if-none-match键的值，服务器计算是否相同，相同304，否则返回新数据200

```
Etag:"c76e6f1ea67df2e7235f56b0e6715667562d4b8f"
```



## HTTP协议

## 一次HTTP请求

```
    注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
    而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
    到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

    详细版：
  	1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
  	2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
  	4、进行HTTP协议会话，客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
  	7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
      8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
      9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

    简洁版：
  	浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
  	服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
  	浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
  	载入解析到的资源文件，渲染页面，完成。
```



# 性能优化

## 重构

```
 表格(table)布局改为DIV+CSS
  使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)
  对于移动平台的优化
  针对于SEO进行优化
  深层次的网站重构应该考虑的方面

  减少代码间的耦合
  让代码保持弹性
  严格按规范编写代码
  设计可扩展的API
  代替旧有的框架、语言(如VB)
  增强用户体验
  通常来说对于速度的优化也包含在重构中

  压缩JS、CSS、image等前端资源(通常是由服务器来解决)
  程序的性能优化(如数据读写)
  采用CDN来加速资源加载
  对于JS DOM的优化
  HTTP服务器的文件缓存
  
```



## 优化方案

```
    （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

    （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

    （3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

    （4） 当需要设置的样式很多时设置className而不是直接操作style。

    （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

    （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

    （7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

    （8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
    对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。
    
    
    
    
    content方面

减少HTTP请求：合并文件、CSS精灵、inline Image
减少DNS查询：DNS查询完成之前浏览器不能从这个主机下载任何任何文件。方法：DNS缓存、将资源分布到恰当数量的主机名，平衡并行下载和DNS查询
避免重定向：多余的中间访问
使Ajax可缓存
非必须组件延迟加载
未来所需组件预加载
减少DOM元素数量
将资源放到不同的域下：浏览器同时从一个域下载资源的数目有限，增加域可以提高并行下载量
减少iframe数量
不要404
Server方面

使用CDN
添加Expires或者Cache-Control响应头
对组件使用Gzip压缩
配置ETag
Flush Buffer Early
Ajax使用GET进行请求
避免空src的img标签
Cookie方面

减小cookie大小
引入资源的域名不要包含cookie
css方面

将样式表放到页面顶部
不使用CSS表达式
使用不使用@import
不使用IE的Filter
Javascript方面

将脚本放到页面底部
将javascript和css从外部引入
压缩javascript和css
删除不需要的脚本
减少DOM访问
合理设计事件监听器
图片方面

优化图片：根据实际颜色需要选择色深、压缩
优化css精灵
不要在HTML中拉伸图片
保证favicon.ico小并且可缓存
移动方面

保证组件小于25k
Pack Components into a Multipart Document
```


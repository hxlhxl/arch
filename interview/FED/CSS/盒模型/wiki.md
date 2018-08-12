# box-model
任何html元素都是一个矩形盒子，由 【内容】+【内边距】+【边框】+【外边距】 构成
盒子是一个一个撑起来的，所以只有最近的子盒子可以撑开父容器，孙子就无法撑开。

## W3C的标准Box Model
```
  /*外盒尺寸计算（元素空间尺寸）*/
  Element空间高度 = content height + padding + border + margin
  Element 空间宽度 = content width + padding + border + margin
  /*内盒尺寸计算（元素大小）*/
  Element Height = content height + padding + border （Height为内容高度）
  Element Width = content width + padding + border （Width为内容宽度）
```

## IE)传统下Box Model（IE6以下，不含IE6版本或“QuirksMode下IE5.5+”）:
```
  /*外盒尺寸计算（元素空间尺寸）*/
  Element空间高度 = content Height + margin (Height包含了元素内容宽度，边框宽度，内距宽度)
  Element空间宽度 = content Width + margin (Width包含了元素内容宽度、边框宽度、内距宽度)
  /*内盒尺寸计算（元素大小）*/
  Element Height = content Height(Height包含了元素内容宽度，边框宽度，内距宽度)
  Element Width = content Width(Width包含了元素内容宽度、边框宽度、内距宽度)
```
## width\height
width和height都是表明元素的内容大小的，而不负责盒子大小。
盒子的大小是由对应的计算策略算出来的。

## background
背景应用于由内容和内边距、边框组成的区域。

# box-sizing
box-sizing ： content-box || border-box || inherit
在使用width/height的时候，根据和模型的不同，width/height作用不同，比如是content-box的时候，就仅仅指代内容的宽高。

取值说明

1、content-box:此值为其默认值，其让元素维持W3C的标准Box Model，也就是说元素的宽度/高度（width/height）等于元素边框宽度（border）加上元素内边距（padding）加上元素内容宽度/高度（content width/height）即：Element Width/Height = border+padding+content width/height。

2、border-box:此值让元素维持IE传统的Box Model（IE6以下版本），也就是说元素的宽度/高度等于元素内容的宽度/高度。（从上面Box Model介绍可知，我们这里的content width/height包含了元素的border,padding,内容的width/height【此处的内容宽度/高度=width/height-border-padding】）。

box-sizing现代浏览器都支持，但IE家族只有IE8版本以上才支持，虽然现代浏览器支持box-sizing，但有些浏览器还是需要加上自己的前缀，Mozilla需要加上-moz-，Webkit内核需要加上-webkit-，Presto内核-o-,IE8-ms-，所以box-sizing兼容浏览器时需要加上各自的前缀



# display:table
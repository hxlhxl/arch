[深入理解 CSS：字体度量、line-height 和 vertical-align](https://zhuanlan.zhihu.com/p/25808995)
[图画的可以，仅供参考](https://segmentfault.com/a/1190000003038583)
[cnblogs](http://www.cnblogs.com/starof/p/4512284.html)
# 

功能：
    设置或检索内联元素在行框内的垂直对其方式。


值：
- baseline
    默认值
- middle
    把当前盒的垂直中心和父级盒的基线加上父级的半x-height对齐
    x-height就是inline字符的高度


# base

- content-area就是文字的大小，font-size+padding对文字的content-area的大小有影响。
- line box的高度就是一行文字的大小(content+area) + 上间距 + 下间距 的最大值；设定line-height时，实际上就是设定的这个值。
- 设置height = line-height垂直居中的原理就是 文字在盒子 中，而上下间距不在盒子中，这样看起来就好像文字在盒子中居中的样子。
- inline-box(不可见)，包含文字的 盒子
    The rectangular area that contains the boxes that form a line is called a line box.

    ...

    When several inline-level boxes cannot fit horizontally within a single line box, they are distributed among two or more vertically-stacked line boxes. Thus, a paragraph is a vertical stack of line boxes.
    When an inline box exceeds the width of a line box, it is split into several boxes and these boxes are distributed across several line boxes. If an inline box cannot be split (e.g., if the inline box contains a single character, or language specific word breaking rules disallow a break within the inline box, or if the inline box is affected by a white-space value of nowrap or pre), then the inline box overflows the line box.
- containing box： 包裹着以上内容的box


# 4种box

要说的4种盒子分别是inline box、line box、content area、containing box ~

inline box (行内框) 每个行内元素会生成一个行内框，行内框是一个浏览器渲染模型中的一个概念，无法显示出来，行内框的高度等于font-size，设定line-height时，行内框的高度不变，改变的是行距。
line box （行框） 行框是指本行的一个虚拟的矩形框，由该行中行内框组成。行框也是浏览器渲染模式中的一个概念，无法显示出来。行框高度等于本行中所有行内框高度的最大值。当有多行内容时，每一行都有自己的行框。
content area （内容区） 内容区是围绕着文字的一种box，无法显示出来，其高度取决于font-size和padding。个人觉得：内容区的高度 = font-size + padding-top + padding-bottom，有待查证，也期待小伙伴们给出答案~
containing box containing box 是包裹着上述三种box的box，有点绕哈~看图


# baseline确定规则

1、inline-table元素的baseline是它的table第一行的baseline。

2、父元素【line box】的baseline是最后一个inline box 的baseline。 

3、inline-block元素的baseline确定规则

规则1：inline-block元素，如果内部有line box，则inline-block元素的baseline就是最后一个作为内容存在的元素[inline box]的baseline，而这个元素的baseline的确定就要根据它自身来定了。           
规则2：inline-block元素，如果其内部没有line box或它的overflow属性不是visible，那么baseline将是这个inline-block元素的底margin边界。
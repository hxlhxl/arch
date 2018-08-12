# BFC(block formatting context,块级格式化上下文)

## 如何理解BFC
[BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

### BOX

- block level box:
    display属性为 block、list-item、table的元素，参与BFC。
- inline level box:
    display属性为 inline、inline-block、inline-table的元素，参与IFC。
- run in box(css3):

## BFC规则

- 内部的Box会在垂直方向上一个接一个的放置
- Box垂直方向的距离由margin决定,属于同一个BFC的两个相邻Box的margin会发生重叠
    块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷(margin collapsing)，有的地方翻译为外边距合并。
    [mdn通俗](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
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


## BFC触发

- 根元素(html,body)
- float属性不为none
- position为absolute或者fixed
- display为inline-block、table-cell、table-caption、flex、inline-flex
- overflow不位visible时


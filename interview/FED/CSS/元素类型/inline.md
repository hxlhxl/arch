[行内元素理解](https://www.w3cplus.com/css/css-font-metrics-line-height-and-vertical-align.html)

也叫内联元素、内嵌元素等；行内元素一般都是基于语义级(semantic)的基本元素，只能容纳文本或其他内联元素，常见内联元素 “a”。比如 SPAN 元素，IFRAME元素和元素样式的display : inline的都是行内元素。例如文字这类元素，各个字母 之间横向排列，到最右端自动折行。


分类
    普通
        span
        a

    特殊
        img、input、svg
        inline-block修饰的
        flex item

一个inline元素会生成一个不可见的line-box
    - 特殊inline ele，在height为auto的情况下，line-box高度为virtual-area height
    - 默认inline ele，line-box高度为virtual-area height


inline元素特性

- 和其他元素都在同一行上
- 高、行高、外边距和内边距不可改变
- 宽度就是它的文字或者图片的宽度，不可改变
- 内联元素一般容纳文本或者其他内联元素，必要情况下使用display修改显示方式，而不要在span里面嵌套div元素
- 对于内联元素，padding和border增加了其background区域，但不会增加内容区域高度（甚至是line-box高度）。因此，你在屏幕上看到的不一定就是内容区域。margin-top和margin-bottom对内联元素不生效。
- 对于行内替代元素，inline-block和blocksified行内元素，padding，margin和border都会增加高度，所以内容区域和line-box的高度也会增加
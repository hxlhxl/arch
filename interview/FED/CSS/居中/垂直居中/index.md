
# 方案
[例子](https://www.cnblogs.com/cainiao-Shun666/p/6622728.html)

- 父元素高度确定的单行文本、行内元素
    line-height = height
- 父元素高度不确定的文本、图片、块级元素
    padding-top = padding-bottom

- 父元素高度确定的多行文本、图片、块级元素
    CSS内置vertical-align，但是只有当父元素为td或者th的时候才会有效；div、p等默认不支持vertical-align，但是可以通过display:table-cell使得div和p等元素支持该属性
    - table + vertical-align:middle(默认就是)
    - display:table-cell+vertical-align:middle

- CSS3 hack
- :before、:after 垂直居中
    适用于不知道子元素的size的时候,使用伪元素的意义在于设置了inline-block这种兄弟元素的基线！


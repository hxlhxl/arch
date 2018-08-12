
# 方案
[例子一](https://www.cnblogs.com/cainiao-Shun666/p/6622728.html)


- 行内元素： 设置text-align: center
- 定宽块状元素： margin-left: auto;margin-right: auto;
    原理：为什么「margin:auto」可以让块级元素水平居中？ - 貘吃馍香的回答 - 知乎
https://www.zhihu.com/question/21644198/answer/42702524
        width-of-containing-block = margin-left + border-left-width + padding-left
                                    + width +
                                    margin-right + border-right-width + padding-right
        rules:
            1. 如果width = 0，其他所有为auto的宽度都是 0
            2. 如果width = Npx，设置margin left和right为auto的时候，margin相等，且会占据该区块父级最大空间，总之就是相等了啊。

- 不定宽块状元素
    1. 在元素外加上table标签，并把内容写在td中，且设置table的margin为auto
    2. 给元素设置 display: inline;并在父容器中设置 text-align: center;
    3. 父元素 position: relative;left: 50%;子元素position: relative;left:-50%;
[学习CSS布局](http://zh.learnlayout.com/position.html)


position表示元素的定位方式
    - 当position不是static的时候，其层叠级别通过'z-index'定义
    - 绝对定位的元素，在'top','right','bottom','left'属性未设置时，会紧跟在其前面的兄弟元素之后，但在位置上不影响常规流中的任何元素。
    - 多个position为absolute时，他们会覆盖彼此，通过left、right或者z-index区别之。

取值
- static(默认)： 对象遵循普通流。此时4个定位偏移属性不会被应用。
- relative： 对象遵循普通流。并且参照自身在普通流中的位置(兄弟、父亲盒模型相对位置)通过'top','left','right','bottom'这4个定位偏移属性进行偏移(以margin作为参考)时不会影响普通流中的任何元素。
- absolute(绝对定位)： 对象脱离普通流,如果父容器没有显示指定大小，那么其大小将会是默认的大小。此时偏移属性参照的是离自身最近的定位[祖先]【注意这里是祖先而不是兄弟元素】元素，如果没有定位的祖先元素，则一直回溯到body标签。盒子的偏移位置不影响普通流中的任何元素，其margin不与其他任何margin重叠。如果没有使用'top','left','right','bottom'修饰，和普通流差不多。
- fixed： 与【absolute】一致。但偏移定位是以窗口为参考单位(和父容器是否为relative没有任何关系)，当出现滚动条时，对象不会随着移动。
- center: 与【absolute】一致。但偏移定位是以定位祖先元素的中心为参考。盒子在其包含容器垂直水平居中。(CSS3)
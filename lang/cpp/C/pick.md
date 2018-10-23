- static用法
https://www.cnblogs.com/JMatrix/p/8194009.html

1. 静态全局变量
    仅在定义它的源文件中有效
2. 静态局部变量
    存在与整个程序生命周期，
    其他函数和文件无法访问
    多次访问其值会引用上一次的值
3. 静态函数(static函数)
    相当于C++中的private关键字，只在本源文件中有效，其他无法访问


- extern

1. extern "C" {}
    https://www.cnblogs.com/x_wukong/p/5630143.html
    C++项目中指示这段代码使用C语言编译
    
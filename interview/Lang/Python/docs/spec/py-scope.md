变量作用域
Local
    Closure
        Global
            Builtin
python按照这个顺序引用变量




refs: http://blog.yxwang.me/2008/10/python-function/

f.func_code是一个code对象，对应于源码中的PyCodeObject。除了《Python源码剖析》中提到的几个属性外，有三个tuple记录了不同类型的变量，co_varnames, co_freevars和co_cellvars，分别对应local variables, free variables和cell variables。
free variables指enclosing scope中的变量，cell variables则是指会被多个scope访问的变量。
也就是说cell_variable是多个作用域都能访问到的变量


```
def foo():
    a = 5
    def bar():
        return a
    print "cellvars:", bar.func_code.co_cellvars
    print "freevars:", bar.func_code.co_freevars
    return bar

g = foo()
print foo.func_code.co_freevars
print foo.func_code.co_cellvars 
```
结果如下
bar cellvars: ()
bar freevars: ('a',)

foo cellvars: ()
foo freevars: ('a',)


1. noConflict()
   简单来说就是让渡变量名，原理就是在引入一个库之前，首先把当前环境中的变量保存起来，然后引入之后覆盖当前环境的该变量。
   如果用户在使用时，调用`noConflict`函数，检查当前变量是否是引入的lib中的导出，再提取之前保存的变量再次覆盖。
   ```
    var old;
    if (typeof $ !== 'undefined') old = $;
    function noConflict() {
        try {
            if ($ === myjq) {
                $ = old;
            }
        } catch(e) {}
        return myjq;
    }
    var myjq = function() {
        console.log('this is myjq msg');
        $ = () => {};
        return $;
    }();
    myjq.noConflict = noConflict;
   ```
2. 
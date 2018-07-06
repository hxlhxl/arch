# 渊源
```
[husa@archlinux PageProcesser]$ find /usr -name 'regex.h'
/usr/include/c++/8.1.1/bits/regex.h
/usr/include/unicode/regex.h
/usr/include/boost/regex.h
/usr/include/regex.h
/usr/include/mozjs-52/unicode/regex.h
find: ‘/usr/share/polkit-1/rules.d’: Permission denied
[husa@archlinux PageProcesser]$ pacman -Qo /usr/include/regex.h
/usr/include/regex.h is owned by glibc 2.27-3
```

# 原型
```
/**
    @preg | regex_t *: 正则表达式指针
    @pattern | const char *: 正则表达式
    @cflags | int: 正则模式
        REG_EXTENDED
            Use Extended Regular Expressions.
        REG_ICASE
            Ignore case in match.
        REG_NOSUB
            Report only success/fail inregexec().
        REG_NEWLINE
            Change the handling of newline characters, as described in the text.
*/
int regcomp(regex_t *preg, const char *pattern, int cflags);      


/**
    @preg | const regex_t *: 正则表达式指针
    @string | const char *: 字符串
    @nmatch | size_t: pmatch[]数组长度
    @pmatch | regmatch_t []: regmatch_t类型的结构体数组，存放匹配文本串的位置信息
        typedef struct
        {
        regoff_t rm_so; // 存放匹配文本串在目标串中的开始位置
        regoff_t rm_eo; // 存放匹配文本串在目标串中的结束位置
        } regmatch_t;

    @eflags | int: 
*/
int regexec(const regex_t *preg, const char *string,
    size_t nmatch, regmatch_t pmatch[], int eflags);

size_t regerror(int errcode, const regex_t *preg,
    char *errbuf, size_t errbuf_size);

void regfree(regex_t *preg);
    当我们使用完编译好的正则表达式后，或者要重新编译其他正则表达式的时候，我们可以用这个函数清空compiled指向的regex_t结构体的内容，请记住，如果是重新编译的话，一定要先清空regex_t结构体。
```


# 用法
```
#include <regex.h>

```
#include <iostream>
#include "Date.h"
#include "Employee.h"

using namespace std;
int main()
{

    Date birth(7, 24, 1993);
    Date hire(4, 24, 2016);
    Employee coder("xiong", "hua", birth, hire);
    /**
     * 
     *  Employee类构造函数含有类对象作为参数，按值传递会发生默认复制构造函数赋值的情况 
     * 
     * 
     * 
     *  
    */
    cout << endl;
    coder.print();
    /*
    函数退出打印四次析构函数
    Date destructor for date: 4/24/2016
Date destructor for date: 7/24/1993
Date destructor for date: 4/24/2016
Date destructor for date: 7/24/1993

    这是因为整个程序中有四个Date实例，两个main函数中的局部变量，
        还有两个，是上述局部变量通过复制构造函数copy了一份到Employee实例中
    所以，会有四次析构函数调用。

    */
    return 0;
}
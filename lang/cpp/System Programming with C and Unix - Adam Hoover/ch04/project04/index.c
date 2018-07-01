#include <stdio.h>
#include <stdlib.h>

int main() {
    double *a;
    a = (double *)malloc(40);
    *a = 100;
    *(a+1) = 101;
    a[2] = 102;
    printf("%f\t%f\t%f", *a, *(a+1), a[2]);
    return 0;
}
/*
_______________________________
Label   Address     Value
a       400-404     10000
[DM]    10000-10039

a是一个double类型的指针，占用8个字节(32位),并用double *表示被分配的数据类型，同时a的值设置为这串内存的首地址

*/
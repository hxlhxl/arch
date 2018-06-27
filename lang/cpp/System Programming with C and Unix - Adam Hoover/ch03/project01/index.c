#include <stdio.h>

main() {
    int arr[3];
    arr[0] = 100;
    arr[4] = 11;
    arr[33333] = 111;   // 访问越界，超过了程序的范围，会发生 Segmentation fault
    printf("%d\n", arr[4]);
    return 0;
}
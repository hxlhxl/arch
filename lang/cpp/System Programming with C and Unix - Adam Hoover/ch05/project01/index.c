#include "stdio.h"
#include "stdlib.h"

int main() {
    FILE *fpt;  // 声明一个文件句柄
    fpt = fopen("output.txt", "w"); // 打开文件，a.out和output.txt之间建立了一个stream
    fprintf(fpt, "This is a test"); // 字节流通过stream，从a.out发往output.txt文件
    fclose(fpt);    // 关闭stream链接
    return 0;
}
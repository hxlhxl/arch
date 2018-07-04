#include "stdio.h"
#include "stdlib.h"

int main() {
    FILE *fpt;  // 声明一个文件句柄
    // char text[80];
    char *text;
    int size = 0;
    fpt = fopen("output.txt", "r"); // 打开文件，a.out和output.txt之间建立了一个stream
    fseek(fpt, 0, SEEK_END);
    size = ftell(fpt);
    rewind(fpt);
    text = (char *)malloc(sizeof(char) * size);
    fread(text, 1, size, fpt);
    // text[size+1] = 0;
    fclose(fpt);    // 关闭stream链接
    printf("content read from file below: \n%s", text);
    return 0;
}
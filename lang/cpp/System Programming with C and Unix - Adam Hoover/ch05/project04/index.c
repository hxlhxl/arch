#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main() {
    int i;
    for (i = 0; i < 5; i++) {
        printf("i=%d ", i); // Linux系统上会在5秒之后一次打印
        // printf("i=%d\n ", i); // Linux line buffer一秒一打印
        fflush();   // 强制刷新buffer
        sleep(1);
    }

    return 0;
}
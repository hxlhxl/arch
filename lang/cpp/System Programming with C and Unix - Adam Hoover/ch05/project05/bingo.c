#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main() {
    int s,x;
    s = 0;
    while (1) {
        printf("#?   ");
        scanf("%d", &x);
        if (x == 0) {
            break;
        }
        s += x;
        printf("sum=%d\n", s);
    }
    return 0;
}
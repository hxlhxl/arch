#include <stdio.h>

int main() {
    double d = 1.99;
    double *dPtr = &d;
    printf("%x\t%d", dPtr, sizeof(dPtr));
    short s = 10;
    short *sPtr = &s;
    printf("\nsizeof short: %d \tsizeof short*%x\t%d",sizeof(s), sPtr, sizeof(sPtr));

    *(sPtr+1) = 11;
    printf("\n%x", sPtr+1);
    return 0;
}
#include <stdio.h>

int division(int numerator, int denominator, int *dividend, int *remainder) {
    printf("address stored in dividend: %u\n", dividend);
    printf("address stored in remainder: %u\n", remainder);
    if (denominator == 0) {
        return(0);
    }
    *dividend = numerator / denominator;
    *remainder = numerator % denominator;
    return(1);
}

int main() {
    int x,y,d,r;
    x = 9;
    y = 2;
    printf("address of d: %u\n", &d);
    printf("address of r: %u\n", &r);
    division(x,y,&d,&r);
    printf("%d/%d = %d with %d remainder\n", x,y,d,r);
    printf("x=%d\n", x);
    return 0;
}
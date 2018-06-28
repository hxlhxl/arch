#include <stdio.h>
#include <stdlib.h>

int main() {
    double *a;
    a = (double *)malloc(40);
    *a = 100;
    *(a+1) = 101;
    printf("%f\t%f", *a, *(a+1));
    return 0;
}
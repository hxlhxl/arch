#include <stdio.h>
#include <stdlib.h>

int main() {
    double **m;
    m = (double**)calloc(2, sizeof(double *));
    m[0] = (double*)calloc(2, sizeof(double));
    m[1] = (double*)calloc(3, sizeof(double));
    m[0][0] = 1;
    m[0][1] = 2;
    m[1][0] = 3;
    m[1][1] = 4;
    m[1][2] = 5;
    printf("%f\t", m[1][2]);
    return 0;
}
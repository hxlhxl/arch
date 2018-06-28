#include <stdio.h>

int main() {
    int arr[5] = {0, 1, 2, 3, 4};
    int *d_ptr = &(arr[0]);
    // pointer syntax
    *(d_ptr + 4) = 100;
    printf("%d\n", arr[4]);
    // mixed syntax
    *(arr + 4) = 111;
    printf("%d\n", arr[4]);
    return 0;
}
#include "header.h"
#include <iostream>
int add(int a,int b) {
    return a + b;
}
int main() {

    int s = add(100,200);
    double q = square(4.5);
    std::cout << "sum is : " << s << std::endl;
    std::cout << "square is : " << q;
    return 0;
}

double square(int n) {
    return 1.0 * n * n;
}



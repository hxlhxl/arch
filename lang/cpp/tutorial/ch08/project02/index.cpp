#include <iostream>

using namespace std;

int cubeByValue(int); // prototype
void cubeByReference(int*);  // prototype

int main() {
    int n = 5;
    n = cubeByValue(n);
    cout << "n is: " << n << " after executing cubeByValue function" << endl;
    cout << endl;
    int number = 5;
    cubeByReference(&number);
    cout << "number is: " << number << " after executing cubeByReference function" << endl;
    return 0;
}   


int cubeByValue(int n) {
    return n * n * n;
}

void cubeByReference(int *nPtr) {
    *nPtr = *nPtr * *nPtr * *nPtr;
}
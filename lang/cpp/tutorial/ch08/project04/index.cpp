#include <iostream>

using namespace std;
int add(int a, int b) {
    return a + b;
}
int main() {
    cout <<sizeof 10 << endl;
    cout << sizeof add(1 , 2) << endl;

    int arr[5] = {1, 2, 3, 4, 5};
    cout << "&arr[0]" << &arr[0] << endl;
    cout << "&arr[3]" << &arr[3] << endl;
    cout << "&arr[3] - &arr[0]" << &arr[3] - &arr[0] <<endl;
    // cout << "&arr[3] + &arr[0]" << &arr[3] + &arr[0] <<endl;

    int a = 100;
    cout << "fdsafa\n";
    int x= 1;
    double b = 200;
    // cout << "&a - &b is: " << &a - &b << endl;
    double *bPtr = &b;
    int *aPtr = &a;
    cout << aPtr << "++++"<< bPtr << "comparasion aPtr bPtr: " << (aPtr > reinterpret_cast<int*>(bPtr) ) << "---" << endl;
    bPtr = reinterpret_cast<double *>(aPtr);

    void *ptr;
    cout << "sizeof ptr: " << sizeof ptr <<endl;
    ptr = bPtr;

    cout << (aPtr == nullptr) <<"afsda" << endl;
    return 0;
}   

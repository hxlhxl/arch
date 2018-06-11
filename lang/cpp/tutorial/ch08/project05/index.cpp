#include <iostream>
#include <iterator>
using namespace std;

int main() {
    int b[] = {10, 20, 30, 40};
    int *bPtr = b;
    int size = end(b) - begin(b);

    cout << "Array b displayed with array subscript notation:\n\n" << endl;
    for( size_t i = 0;i < end(b) - begin(b); i++) {
        cout << b[i] << " ";
    }
    cout << endl;
    cout << "Array offset notation:\n\n";
    for (size_t i = 0;i < end(b) - begin(b);i++) {
        cout << *(b + i) << " ";
    }
    cout << endl;

    cout << "Array Pointer bPtr displayed with array subscript notation:\n\n" << endl;
    for( size_t i = 0;i < size; i++) {
        cout << bPtr[i] << " ";
    }
    cout << endl;
    cout << "Array Pointer bPtr offset notation:\n\n";
    for (size_t i = 0;i < size + 10;i++) {
        cout << *(bPtr + i) << " ";
    }
    cout << endl;
    return 0;
}
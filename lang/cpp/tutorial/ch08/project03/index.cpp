#include <iostream>

using namespace std;
void printArray(int *arr, int size) {
    for (int i = 0; i < size; ++i) {
        cout << *(arr+i) << endl;
    }
}

void printDoubleArray(int *[2], int size) { {

}


}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr, 5);
    cout << "----------------" << endl;
    int doubleArr[5][2] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // printDoubleArray(doubleArr, 100);    //  int **

    int a = 10;
    int b = 100;

    int  *  aPtr = &a;
    cout << aPtr << "\tsizeof aPtr is: " << sizeof(aPtr) << endl;
    cout << "sizeof arr is: " << sizeof(arr) << endl;
    cout << "sizeof a[0] is: " << sizeof(arr[0]) << endl;
    cout << "sizeof a is: " << sizeof(a) << endl;
    return 0;
}   

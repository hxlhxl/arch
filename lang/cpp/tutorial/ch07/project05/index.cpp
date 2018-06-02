#include <iostream>
#include <iomanip>
#include <array>
#include <random>
#include <ctime>

using namespace std;

void staticArrayInit();
void automaticArrayInit();
const size_t arraySize = 3;


int main() {

    cout << "First call to each function: \n";
    staticArrayInit();
    automaticArrayInit();

    cout << "Second call to each function: \n";
    staticArrayInit();
    automaticArrayInit();

    cout << endl;
    
    return 0;
}

void staticArrayInit() {
    static array<int, arraySize> array1;
    cout << "\nValues on entering staticArrayInit:\n";
    for(size_t i=0;i<array1.size();++i) {
        cout << "array1 " << array1[i] << endl;
    }
    cout << "\nValues on existing staticArrayInit:\n";
    for(size_t j=0;j<array1.size();++j) {
        cout << "array1 " << (array1[j] += 5) << endl;        
    }
}

void automaticArrayInit() {
    array<int, arraySize> array2 = {1, 2, 3};
    cout << "\nValues on entering automaticArrayInit:\n";
    for(size_t i=0;i<array2.size();++i) {
        cout << "array2 " << array2[i] << endl;
    }
    cout << "\nValues on existing automaticArrayInit:\n";
    for(size_t j=0;j<array2.size();++j) {
        cout << "array2 " << (array2[j] += 5) << endl;        
    }
}
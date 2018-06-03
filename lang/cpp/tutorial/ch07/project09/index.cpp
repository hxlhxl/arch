#include <iostream>
#include <iomanip>
#include <array>
#include <random>
#include <ctime>
#include <algorithm>

using namespace std;

const size_t rows = 2;
const size_t columns = 3;
void printArray(const array< array< int, columns>, rows> &);

int main() {


    array<array<int,columns>, rows> array1 = {1, 2, 3, 4, 5, 6};
    array<array<int,columns>, rows> array2 = {1, 2, 3, 4, 5};
    cout << "values in array1 by row are: \n";
    printArray(array1);
    cout << "values in array2 by row are: \n";
    printArray(array2);

    cout << array2[1][1] << "----" << endl;
    return 0;
}


void printArray(const array<array<int, columns>,rows> &arr) {
    for(auto const &row: arr) { // 根据row的初始化值确定row的数据类型
        for(auto const element: row) {
            cout << element << " ";
        }
        cout << endl;
    }
}

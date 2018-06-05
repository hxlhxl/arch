#include <iostream>
#include <iomanip>
#include <array>
#include <vector>
#include <stdexcept>

using namespace std;

const size_t rows = 2;
const size_t columns = 3;
void outputVector(const vector<int> &);
void inputVector(vector<int> &);
int main() {
    vector<int> integer1(7);
    vector<int> integer2(10);

    cout << "Sizeof vector integer1 is: " << integer1.size() << endl;
    outputVector(integer1);

    cout << "Sizeof vector integer2 is: " << integer2.size() << endl;
    outputVector(integer2);

    cout << "Enter 17 integers: " << endl;
    inputVector(integer1);
    // inputVector(integer2);

    cout << "After input,the vector contains:\n" << "integer1: " << endl;
    outputVector(integer1);
    cout << "-----------" << endl;
    return 0;
}


void outputVector(const vector<int> &items) {
    for(int item: items) {
        cout << item << " ";
    }
    cout << endl;
}

void inputVector(vector<int> &items) {
    for(int &item: items) { // 必须为引用，否则不会改变vector元素的值！
        cin >> item;
    }
}

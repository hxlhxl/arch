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
    inputVector(integer2);

    cout << "After input,the vector contains:\n" << "integer1: " << endl;
    outputVector(integer1);
    cout << "integer2" << endl;
    outputVector(integer2);

    cout << "\nEvaluating: integer1 != integer2\n";
    if (integer1 != integer2) {
        cout << "integer1 and integer2 are not equal" << endl;
    }

    vector<int> integer3(integer1);
    cout << "\nSize of integer3 is: " << integer3.size() << "\nVector after initializtion:\n" << endl;
    outputVector(integer3);
    // 赋值
    cout << "\nAssigning integer2 to integer1\n";
    integer2 = integer1;
    cout << "\n integer1 is: \n" << endl;
    outputVector(integer1);
    cout << "\n integer2 is: \n" << endl;
    outputVector(integer2);
    cout << "\nEvaluating: integer1 == integer2\n";
    if (integer1 == integer2) {
        cout << "integer1 and integer2 are equal" << endl;
    }

    cout << "element at 5 in vector integer1" << endl;
    cout << integer1[5] << endl;

    // 赋值
    integer1[5] = 999;
    cout << "element at 5 in vector integer1" << endl;
    cout << integer1[5] << endl;


    try {
        cout << "try access elem in integer1 at index 15" << endl;
        cout << integer1.at(15) << endl;
    } catch(out_of_range &ex) {
        cerr << "An exception occurred: \n" << ex.what() << endl;
    }

    cout << "使用push_back动态改变vector大小" << endl;
    integer3.push_back(11111);
    outputVector(integer3);

    cout << "-----------" << endl;
    getchar();
    getchar();
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

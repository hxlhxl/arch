#include <iostream>
#include <iomanip>
#include <array>

using namespace std;

int main() {

    const int x = 7;
    cout << "const x value is: " << x << endl;
    // error 1|| 修改const声明的变量
    const int y = 9;
    // y = 10;
    // error 2|| const没有初始化
    // const int z;
    return 0;
}
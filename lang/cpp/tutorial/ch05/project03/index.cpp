#include <iostream>
/**
 * 编写一个程序，使用for求一些列整数之和， 要求输入第一个数位循环个数
 * 5 100 200 300 400 500
 * 
*/

using namespace std;
int main() {
    int total,sum=0;
    cout << "Please enter a number for for purpose: " << endl;
    cin >> total;
    for (int i=0,input=0;i<total;++i) {
        cin >> input;
        sum += input;
    }
    cout << "sum is : " << sum << endl;
    return 0;
}
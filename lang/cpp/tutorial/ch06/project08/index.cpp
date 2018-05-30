#include <iostream>

using namespace std;

int add100(int n) {

    static int yibai = 100;
    return yibai++;
}

int main() {

    cout << add100(1) << endl;
    cout << add100(1) << endl;
    cout << add100(1) << endl;
    cout << add100(1) << endl;
    cout << add100(1) << endl;
    return 0;
}
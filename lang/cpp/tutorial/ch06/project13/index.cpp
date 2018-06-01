#include <iostream>


using namespace std;

int square(int x) {
    return x * x;
}

double square(double x) {
    cout << "double" << endl;
    return x * x;
}
int main() {

    cout << "int square is:" << square(10) << endl;
    cout << "double square is:" << square(10.0) << endl;
    return 0;
}

#include <iostream>

using namespace std;

unsigned long factorial(unsigned long);

int main() {
    cout << factorial(10.0) << endl;
    return 0;
}


unsigned long factorial(unsigned long n) {

    if (1.0 == n) {
        return 1;
    }
    return n * factorial(--n);
}

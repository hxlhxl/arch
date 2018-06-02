#include <iostream>

using namespace std;

unsigned long fibonacci(unsigned long);

int main() {
    cout << fibonacci(10.0) << endl;
    return 0;
}


unsigned long fibonacci(unsigned long n) {

    if (1.0 == n || 0 == n) {
        return n;
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}

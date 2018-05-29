#include <iostream>

#include <limits>

using namespace std;

int main() {
    int max = INT_MAX;

    for (int i=0,tmp;i<5;i++) {
        cin >> tmp ;
        if (tmp <= max) {
            max = tmp;
        }
    }
    cout << "Minimum number is: " << max << endl;
    return 0;
}
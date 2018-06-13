#include <iostream>
#include "Time.h"
#include "test.h"

using namespace std;

int main() {
    int *ptr = nullptr;
    // try {
    //     *ptr = 100;
    // } catch(const std::exception &e) {
    //     // cout << e << endl;
    // }
    cout << "1 + 2 is: " << add(1,2) <<endl;
    Time t = Time(4, 9, 37);
    t.printUniversal();
    cout << "-------" <<endl;
    t.printStandard();

    int times(int a, int b) {
        return a * b;
    }
    return 0;
}
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

    int times(int, int);

    Time &tRef = t;
    Time *tPtr = &t;

    cout << "access member by reference '.' " << tRef.publicData << endl;
    cout << "access member by pointer '->' " << tPtr -> publicData << endl;
    return 0;
}

int times(int a, int b) {
    return a * b;
}
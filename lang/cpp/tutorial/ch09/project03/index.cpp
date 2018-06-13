#include <iostream>
#include "Time.h"

using namespace std;

int main() {
    int *ptr = nullptr;
    // try {
    //     *ptr = 100;
    // } catch(const std::exception &e) {
    //     // cout << e << endl;
    // }
    Time t = Time(4, 9, 37);
    t.printUniversal();
    cout << "-------" <<endl;
    t.printStandard();

    int times(int, int);

    Time &tRef = t;
    Time *tPtr = &t;

    cout << "access member by reference '.' " << tRef.publicData << endl;
    cout << "access member by pointer '->' " << tPtr -> publicData << endl;

    cout << "-------" <<endl;
    Time t1 = Time(10);
    t1.printStandard();

    cout << "-------" <<endl;
    Time t2(20);
    t2.printStandard();

    cout << "-------" <<endl;
    Time t3 {20, 30, 40};
    t3.printStandard();

    cout << "-------" <<endl;
    Time t4 {20, 30, 40};
    t4.printStandard();

    return 0;
}

int times(int a, int b) {
    return a * b;
}
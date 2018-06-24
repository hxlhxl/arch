#include <iostream>
#include "Time.h"

using namespace std;

int main() {
    Time t;
    t.setHour(1).setMinute(47).setSecond(47);
    t.printStandard();

    return 0;
}
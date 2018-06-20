#include <iostream>
#include "Date.h"

using namespace std;

Date::Date(int y, int m, int d): year(y), month(m), day(d) {
    cout << "date constructor invoked!" << endl;
}

void Date::print() const {
    cout << "date is: " << year << "-" << month << "-" << day << endl;
}

void Date::_print() {
    cout << "date is: " << year << "-" << month << "-" << day << endl;
}

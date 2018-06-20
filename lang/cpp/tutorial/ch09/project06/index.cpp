#include <iostream>
#include "Date.h"

using namespace std;

const Date getDateInst(Date d) {
    return d;
}

int main() {
    Date d1 = Date(2018, 6, 20);
    Date d2 = Date();
    d1.print();
    d2.print();

    d2 = d1;
    cout << "After assignment: d2 = d1, d2.print() now is: " << endl;
    d2.print();

    cout << "-------------Instance as parameter and return value test------------------" << endl;
    const Date d3 = getDateInst(d2);
    d3.print();
    // d3._print(); // error: passing 'const Date' as 'this' argument discards qualifiers [-fpermissive]
    return 0;
}
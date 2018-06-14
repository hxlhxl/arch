#include <iostream>
#include "Time.h"

using namespace std;

int gNum = 100;
int & getRef(int num) {
    return gNum;
}
int main() {
    int myNum = 111;
    int &numRef = getRef(myNum);
    cout << "----------" << endl;
    Time t;
    unsigned int &hourRef = t.badSetHour(20);
    cout << "Valid hour before modification: " << hourRef;
    hourRef = 30;
    cout << "\nInvalid hour after modification: " << t.getHour();
    t.badSetHour(12) = 74;
    cout << "\n\n\n------------------------------------\n"
        << "POOR PROGRAM PRACTICE!\n"
        << "t.badSetHour(12) as an lvalue, invalid hour: "
        << t.getHour()
        << "\n\n---------------------------------\n"
        << endl;
    return 0;
}
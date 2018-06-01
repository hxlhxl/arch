#include <iostream>
#include "maximum.h"

using namespace std;


int main() {
    int i1 = 10,i2 = 20,i3 = 30;
    double d1 = 11.1,d2 = 22.2,d3 = 33.3;
    char c1 = 'A',c2 = 'B',c3 = 'C';
    cout << maximum(i1,i2,i3) << endl;
    cout << maximum(d1,d2,d3) << endl;
    cout << maximum(c1,c2,c3) << endl;
    return 0;
}

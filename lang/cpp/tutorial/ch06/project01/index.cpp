#include <iostream>
#include <cmath>

using namespace std;

int main() {

    int err = sqrt(-900);
    cout << "Errorno is : " << errno << "and EDOM is:" << EDOM << endl;
    return 0;
}
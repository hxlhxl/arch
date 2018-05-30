#include <iostream>

using namespace std;
int main() {

    enum Month {Jan=10,Feb,Mar,Apri,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec};
    enum class AnotherMonth : unsigned int {Jan,Feb};
    Month month = Feb;
    AnotherMonth m = AnotherMonth::Feb;
    cout << month << "  " << endl;
    return 0;
}
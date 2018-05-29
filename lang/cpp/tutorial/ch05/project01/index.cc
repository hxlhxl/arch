#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {
    double amount;
    double principal = 1000.0;
    double rate = .05;

    cout << "Year" << setw(21) << "Amount on deposit" << endl;
    cout << fixed << setprecision(10) ;

    for (unsigned int year = 1;year <= 10; ++year) {
        amount = principal * pow(1 + rate, year);
        cout << setw(4) << left << year << setw(21) << right << amount << endl;
    }
    return 0;
}     
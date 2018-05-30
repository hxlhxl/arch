#include <iostream>

using namespace std;

int squareByValue(int);
void squareByReference(int&);

int main() {
    int x = 2;
    int z = 4;

    cout << "x= " << x << "before squareByValue\n";
    cout << "value returned by squareByValue:" << squareByValue(x) << endl;
    cout << "x= " << x << "after squareByValue\n";


    cout << "z= " << z << "before squareByReference\n";
    squareByReference(z);
    cout << "z= " << z << "after squareByReference\n";

    return 0;
}


int squareByValue(int number) {
    return number *= number;
}

void squareByReference(int &numberRef) {
    numberRef *= numberRef;
}
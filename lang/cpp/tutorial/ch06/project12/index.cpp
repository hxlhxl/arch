#include <iostream>


using namespace std;

int number = 7;
int main() {

    int number = 3;
    cout << "local number is:" << number << endl;
    cout << "global number is:" << ::number << endl;
    return 0;
}

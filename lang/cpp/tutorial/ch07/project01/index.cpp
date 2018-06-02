#include <iostream>
#include <iomanip>
#include <array>

using namespace std;

int main() {

    array<int, 5> n;
    for(size_t i = 0; i < n.size(); ++i) {
        n[i] = 0;
    }
    cout << "Element" << setw(13) << "Value:" << endl;
    for(size_t j=0; j < n.size(); ++j) {
        cout << setw(7) << j << setw(13) << n[ j ] << endl;
    }
    cout << "--------------------------\n";

    array<int, 5> arr = {10, 20, 30, 40, 50};
    cout << "Element" << setw(13) << "Value:" << endl;
    for(size_t j=0; j < arr.size(); ++j) {
        cout << setw(7) << j << setw(13) << arr[ j ] << endl;
    }
    cout << "--------------------------\n";

    const size_t arraySize = 5;
    array<int, arraySize> s;
    for(size_t i = 0; i < s.size(); ++i) {
        s[ i ] = 2 + 2 * i;
    }
    cout << "Element" << setw(13) << "Value:" << endl;
    for(size_t j=0; j < s.size(); ++j) {
        cout << setw(7) << j << setw(13) << s[ j ] << endl;
    }
    return 0;
}
#include <iostream>
#include <iomanip>
#include <array>

using namespace std;

int main() {

    const array<int, 5> arr = {1, 2, 3, 4, 5};
    int sum = 0;
    for(size_t i = 0; i < arr.size(); ++i) {
        sum += arr[i];
    }
    cout << "total of arr is: " << sum << endl;
    return 0;
}
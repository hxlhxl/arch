#include <iostream>
#include <iomanip>
#include <array>
#include <random>
#include <ctime>

using namespace std;

int main() {

    const array<int, 5> arr = {1, 2, 3, 4, 5};
    int sum = 0;
    for(size_t i = 0; i < arr.size(); ++i) {
        sum += arr[i];
    }
    cout << "total of arr is: " << sum << endl;

    default_random_engine engine( static_cast<unsigned int> (time(0)));
    uniform_int_distribution<unsigned int> randomInt(1, 6);
    const size_t arraySize = 7;
    array<unsigned int, arraySize> frequency = {};

    for(unsigned int roll = 1; roll <= 600000; ++roll) {
        ++frequency[randomInt(engine)];
    }
    cout << "Face" << setw(13) << "Frequency" << endl;

    for(size_t face = 1; face < frequency.size(); ++face) {
        cout << setw(4) << face << setw(13) << frequency[ face ] << endl;
    }
    cout << "---------------\n";
    cout << frequency[0] << "???" << endl;
    return 0;
}
#include <iostream>
#include <iomanip>
#include <array>
#include <random>
#include <ctime>
#include <algorithm>

using namespace std;


int main() {

    const size_t arraySize = 7;
    array<string, arraySize> colors = {"red", "orange", "yellow", "green", "blue", "indigo", "violet"};
    cout << colors.begin()<< " begin >\n";
    cout << "unsorted array:\n";
    for (string color: colors) {
        cout << color << "  " ;
    }
    sort(colors.begin(), colors.end());
    cout << "sorted array:\n";
    for (string color: colors) {
        cout << color << " " ;
    }
    // search indigo
    bool found = binary_search(colors.begin(), colors.end(), "indigo");
    cout << "\n\n\"indigo\"" << "was" << (found ? " found" : "not found") << "in colors array" << endl;
    return 0;
}

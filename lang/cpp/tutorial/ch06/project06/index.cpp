#include <iostream>
#include <iomanip>
#include <random>
#include <ctime>

using namespace std;
int main() {
    default_random_engine engine(static_cast<unsigned int>(time(0)));
    uniform_int_distribution<unsigned int> randomInt(1,6);
    for (unsigned int counter = 1;counter <= 10; ++counter) {

        cout << setw(10) << randomInt(engine);
        if (counter % 5 == 0) {
            cout << endl;
        }
    }

    return 0;
}
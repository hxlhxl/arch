#include <iostream>
#include <iomanip>
#include <cstdlib>


using namespace std;

int main() {
    cout << RAND_MAX << endl;
    for(unsigned int counter = 1;counter <= 20;++counter) {
        cout << setw(10) << 1 + rand() % 6;
        if (counter % 5 == 0) {
            cout << endl;
        }
    }
    unsigned int freq1 = 0;
    unsigned int freq2 = 0;
    unsigned int freq3 = 0;
    unsigned int freq4 = 0;
    unsigned int freq5 = 0;
    unsigned int freq6 = 0;
    for(unsigned int counter = 1;counter <= 60000000;++counter) {
        int num = 1 + rand() % 6;
        switch(num) {
            case 1:
                freq1++;
                break;
            case 2:
                freq2++;
                break;
            case 3:
                freq3++;
                break;
            case 4:
                freq4++;
                break;
            case 5:
                freq5++;
                break;
            case 6:
                freq6++;
                break;
        }
    }
    cout << "freq1: " << freq1 << endl;
    cout << "freq2: " << freq2 << endl;
    cout << "freq3: " << freq3 << endl;
    cout << "freq4: " << freq4 << endl;
    cout << "freq5: " << freq5 << endl;
    cout << "freq6: " << freq6 << endl;
    return 0;
}
#include <iostream>


using namespace std;

unsigned int boxVolume(unsigned int length = 1,unsigned int width = 1,unsigned int height = 1);

int main() {
    cout << "The default box volume is:" << boxVolume() << endl;
    cout << "The length 10 box volume is:" << boxVolume(10) << endl;
    cout << "The length 10 width 5 box volume is:" << boxVolume(10,5) << endl;
    cout << "The length 10 width 5 height 2 box volume is:" << boxVolume(10,5,2) << endl;
    return 0;
}


unsigned int boxVolume(unsigned int length,unsigned int width,unsigned int height) {
    return length * width * height;
}
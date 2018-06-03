#include <iostream>
#include <iomanip>
#include <array>
#include <random>
#include <ctime>
#include "GradeBook.h"

using namespace std;


int main() {

    const array<int, GradeBook::students> gradesArray = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    GradeBook gb("English", gradesArray);
    gb.displayMessage();
    cout << "max: " << gb.getMaximum() << endl;
    cout << "min: " << gb.getMinimum() << endl;
    gb.processGrades();
    return 0;
}

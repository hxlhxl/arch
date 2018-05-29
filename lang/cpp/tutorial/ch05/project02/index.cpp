#include "GradeBook.h"
#include <iostream>


using namespace std;

int main() {
    GradeBook gb("English");
    cout << "My course name is: " << gb.getCourseName() << endl;
    gb.readInput();
    gb.displayGrade();
    return 0;
}
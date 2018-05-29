#include "GradeBook.h"
#include <iostream>


using namespace std;

int main() {
    GradeBook gb("English");
    cout << "My course name is: " << gb.getCourseName() << endl;
    cout << "Max grade is:" << gb.maximum(17,14,15);
    return 0;
}
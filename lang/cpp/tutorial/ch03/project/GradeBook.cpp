#include <iostream>
#include <string>
#include "GradeBook.h"
using namespace std;

GradeBook::GradeBook(string name) {
    courseName = name;
}

void GradeBook::displayMessage() const {
    cout << "My course name is: " << courseName << endl;
}
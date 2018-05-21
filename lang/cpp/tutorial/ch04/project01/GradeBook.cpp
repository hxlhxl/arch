#include <iostream>
#include "GradeBook.h"
using namespace std;
GradeBook::GradeBook(string name) {
    setCourseName(name);
}

void GradeBook::setCourseName(string name) {
    if (name.size() <= 25) {
        courseName = name;
    } else {
        courseName = name.substr(0,25);
        cerr << "name exceeds maximum length of 25 characters" << endl;
    }
}

string GradeBook::getCourseName() const {
    return courseName;
}

void GradeBook::displayMessage() const {
    cout << "My course name is: " << courseName << endl;
}

void GradeBook::determineClassAverage() const {
    int total = 0;
    unsigned int gradeCounter = 1;
    while (gradeCounter <= 10) {
        cout << "Enter grade:";
        int grade = 0;
        cin >> grade;
        total = total + grade;
        gradeCounter += 1;
    }
    int average = total / 10;
    cout << "average of 10 grades is: " << average << endl;
}
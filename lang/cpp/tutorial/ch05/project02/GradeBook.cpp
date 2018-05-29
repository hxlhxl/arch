#include "GradeBook.h"
#include <string>
#include <iostream>
#include <iomanip>

using namespace std;

GradeBook::GradeBook(string name):
    courseName(name),
    aGrade(0),
    bGrade(0),
    cGrade(0),
    dGrade(0),
    eGrade(0) {
}

void GradeBook::setCourseName(string name) {
    courseName = name;
}

string GradeBook::getCourseName() const {
    return courseName;
}

void GradeBook::readInput() {
    int grade;

    while((grade = cin.get()) != EOF) {
        switch(grade) {
            case 'A':
            case 'a': 
                aGrade++;
                break;
            case 'B':
            case 'b': 
                bGrade++;
                break;
            case 'C':
            case 'c': 
                cGrade++;
                break;
            case 'D':
            case 'd': 
                dGrade++;
                break;
            case 'E':
            case 'e': {
                eGrade++;
                break;
            }
            case ' ':
            case '\n':
            case '\t': break;
            default: {
                cout << "Input out of range..." << endl;
                break;
            }
        }
    }
}

void GradeBook::displayGrade() const {
    cout << setw(12) << "Grade Type" << setw(14) << "Grade times" << endl;
    cout << setw(12) << "aGrade" << setw(14) << aGrade << endl;
    cout << setw(12) << "bGrade" << setw(14) << bGrade << endl;
    cout << setw(12) << "cGrade" << setw(14) << cGrade << endl;
    cout << setw(12) << "dGrade" << setw(14) << dGrade << endl;
    cout << setw(12) << "eGrade" << setw(14) << eGrade << endl;
}
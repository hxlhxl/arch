#include <iostream>
#include <iomanip>
#include "GradeBook.h"

using namespace std;

GradeBook::GradeBook(const string& name,const array<int, GradeBook::students>& gradesArray):
    courseName(name),
    grades(gradesArray)
     {
grades = gradesArray;
}

void GradeBook::displayMessage() const {
    cout << "My course name is: " << courseName << endl;
}

void GradeBook::setCourseName(const string& name) {
    courseName = name;
}

string GradeBook::getCourseName() const {
    return courseName;
}
int GradeBook::getMinimum() const {
    int lowGrade = 100; // assume lowest grade is 100;
    for(int grade: grades) {
        if (grade < lowGrade) {
            lowGrade = grade;
        }
    }
    return lowGrade;
}
int GradeBook::getMaximum() const {
    int highGrade = 0;
    for (int grade: grades) {
        if (grade > highGrade) {
            highGrade = grade;
        }
    }
    return highGrade;
}

double GradeBook::getAverage() const {
    int total = 0;
    for(int grade: grades) {
        total += grade;
    }
    return static_cast< double >(total) / grades.size();
}

void GradeBook::outputGrades() const {

    cout << "\n The Grades are: \n" << endl;
    for(size_t student = 0;student < grades.size(); ++student) {
        cout <<"Student" << setw(2) << student + 1 << ": "<< setw(3) 
            << grades[ student ] << endl;
    }
}

void GradeBook::processGrades() const {
    outputGrades();
    cout << setprecision(2) << fixed;
    cout << "\nClass average is: " << getAverage() << endl;
}
#include <iostream>
#include <string>

using namespace std;

class GradeBook {
    private:
        string courseName;
        string courseTime;
    public:
        // GradeBook(string _courseName) {
        //     courseName = _courseName;
        // }
        explicit GradeBook(string _courseName,string courseTime) :courseName(_courseName),courseTime(courseTime) {}
        void setCourseName(string _courseName) {
            courseName = _courseName;
        }
        string getCourseName() const {
            return courseName;
        }
        void displayMessage() const {
            cout << "My course name is: " << courseName << "and My course time is: " << courseTime << endl;
        }
};

int main() {
    GradeBook gb = GradeBook("English","2018-01-01");
    gb.displayMessage();
    getchar();
    getchar();
    return 0;
}
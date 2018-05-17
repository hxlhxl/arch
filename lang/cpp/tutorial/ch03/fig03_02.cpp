#include <iostream>
#include <string>
using namespace std;

class GradeBook {
    private:
        string courseName;
    public:
        string getCourseName() const {
            return courseName;
        }
        void setCourseName(string _courseName) {
            courseName = _courseName;
        }
        void displayMessage() const {
            cout << "My course name is:" << courseName << endl;
        }
};

int main() {
    cout << "Hello World!" << endl;

    GradeBook gb = GradeBook();
    string userCourseName;
    cout << "Enter your course name: " << endl;
    getline(cin,userCourseName);
    gb.setCourseName(userCourseName);
    gb.displayMessage();
    return 0;
}

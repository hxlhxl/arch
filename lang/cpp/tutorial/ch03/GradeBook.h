#include <iostream>
#include <string>

class GradeBook {
    private:
        std::string courseName;
    public:
        explicit GradeBook(std::string name):courseName(name) {}
        void displayMessage() const {
            std::cout << "My course name is: " << courseName << std::endl;
        }
}
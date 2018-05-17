#include <string>

class GradeBook {
    public:
        explicit GradeBook(std::string name);
        void displayMessage() const;
    private:
        std::string courseName;
};
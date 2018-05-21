#include <string>

class GradeBook {
    public:
        explicit GradeBook(std::string name);
        void setCourseName(std::string name);
        std::string getCourseName() const;
        void displayMessage() const;
        void determineClassAverage() const;
    private:
        std::string courseName;
};
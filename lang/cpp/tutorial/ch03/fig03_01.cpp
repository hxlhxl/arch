
#include <iostream>
using namespace std;

class GradeBook {
public:
	void displayMessage() const {
		cout << "Welcome to the GradeBook" << endl;
	}
};

int main() {
	GradeBook myGradeBook;
	myGradeBook.displayMessage();
}

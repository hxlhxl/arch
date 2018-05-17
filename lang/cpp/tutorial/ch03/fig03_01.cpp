
#include <iostream>
using namespace std;

class GradeBook {
public:
	void displayMessage() const {
		int x = 1000;
		cout << "Welcome to the GradeBook" << endl;
	}
};

int main() {
	GradeBook myGradeBook;
	myGradeBook.displayMessage();
	getchar();
	getchar();
}

#include <iostream>
using namespace std;

class Test {
    public:
        explicit Test(int = 0);
        void print() const;
    private:
        int x;
};

Test::Test(int value):x(value){

}

void Test::print() const {
    cout << "           x is: " << x << endl;
    cout << "           this->x is: " << this->x << endl;
    cout << "           (*this).x is: " << (*this).x << endl;
}

int main() {
    Test t(100);
    t.print();
    
    return 0;
}
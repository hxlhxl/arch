#include <iostream>

using namespace std;

class Count
{
    friend void setX(Count &, int);
    public:
        Count():x(0)
        {}
        void print() const
        {
            cout << x << endl;
        }
    private:
        int x;
};

void setX(Count &c, int val)
{
    c.x = val;
}


int main()
{
    int x = 11;
    int &y = x;
    y = 100;
    cout << "now x is: " << x << endl;;
    Count counter;
    cout << "counter.x after instantiation: ";
    counter.print();
    setX(counter, 8);
    cout << "counter.x after setX function: ";
    counter.print();
    return 0;
}
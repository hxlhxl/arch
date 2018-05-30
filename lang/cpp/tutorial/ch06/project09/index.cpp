#include <iostream>

using namespace std;

void useLocal();
void useStaticLocal();
void useGlobal();

int x = 1;
int y;
int main() {
    cout << "global x in main is:" << x << endl;
    int x = 5;
    cout << "local x in main's outer scope is" << x << endl;

    {
        // start new scope
        int x = 7;
        cout << "local x in main's inner scope is" << x << endl;
    }

    cout << "local x in main's outer scope is" << x << endl;
    useLocal();
    useStaticLocal();
    useGlobal();
    useLocal();
    useStaticLocal();
    useGlobal();
    cout << "\nlocal x in main is:" << x << endl;

    return 0;
}


void useLocal() {

    int x = 25;
    cout << "\n local is " << x << "on entering useLocal" <<endl;
    ++x;
    cout << "\n local is " << x << "on exiting useLocal" <<endl;

}

void useStaticLocal() {

    static int x = 50;
    cout << "\n local is " << x << "on entering useStaticLocal" <<endl;
    ++x;
    cout << "\n local is " << x << "on exiting useStaticLocal" <<endl;

}

void useGlobal() {

    cout << "\n global is " << x << "on entering useGlobal" <<endl;
    x *= 10;
    cout << "\n global is " << x << "on exiting useGlobal" <<endl;

}
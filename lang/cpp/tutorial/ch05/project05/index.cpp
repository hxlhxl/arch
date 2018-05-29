#include <iostream>
#include <string>
using namespace std;

string joinStar(int n) {
    string s = "*";
    for(int i=1;i<n;++i) {
        s += " *";
    }
    return s;
}

int main() {

    for (int i=10;i>0;--i) {
        string s = joinStar(i);
        cout << s << endl;
    }
    return 0;
}
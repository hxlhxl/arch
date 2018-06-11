#include <iostream>

using namespace std;

int main() {
    char color[] = "blue";
    char const *colorPtr = "pink";
    const char *colorPtrx = "pink";
    cout << sizeof("hello world") << endl;

    char word[20];
    cin >> word;
    cout << "word is: " << word << endl;
    cin.getline(word, 20);
    // getline(cin, word);  // word为string类型才可以
    cout << "wordx is: " << word << endl;
    return 0;
}
#include <string>
using namespace std;

#ifndef __CREATE_H__
#define __CREATE_H__

class CreateAndDestroy {
    public:
        CreateAndDestroy(int, string);
        ~CreateAndDestroy();
    private:
        int objectID;
        string message;
};

#endif
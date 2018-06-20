
#ifndef __DATE_H__
#define __DATE_H__

class Date {
    public:
        explicit Date(int = 2000, int = 1, int = 1);
        void print() const;
        void _print();
    private:
        unsigned int year;
        unsigned int month;
        unsigned int day;
};

#endif
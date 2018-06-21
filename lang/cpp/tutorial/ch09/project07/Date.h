
#ifndef __DATE_H__

#define __DATE_H__

class Date
{
    public:
        static const unsigned int monthsPerYear = 12;
        explicit Date(int = 1, int = 1, int = 1900);
        void print() const;
        ~Date();
    private:
        unsigned int month;
        unsigned int day;
        unsigned int year;

        unsigned int checkDay( int ) const;
};

#endif
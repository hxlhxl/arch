


#ifndef __TIME_H__
#define __TIME_H__

class Time {
    public:
        explicit Time(int = 0, int = 0, int = 0);
        void setTime(int, int, int);
        unsigned int getHour() const;
        unsigned int &badSetHour(int);
    private:
        unsigned int hour;
        unsigned int minute;
        unsigned int second;
};
#endif
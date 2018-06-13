
// #ifndef __TIME_H__
// #define __TIME_H__

class Time {
    public:
        Time();
        Time(int, int, int);
        void setTime(int, int, int);
        void printUniversal() const;    // universal-time format
        void printStandard() const; // standard-time format
    private:
        unsigned int hour;      // 0-23
        unsigned int minute;    // 0-59
        unsigned int second;    // 0-59
};

// #endif
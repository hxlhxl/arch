
#ifndef __TIME_H__
#define __TIME_H__


class Time
{
private:
    /* data */
    unsigned int hour;
    unsigned int minute;
    unsigned int second;
public:
    explicit Time(int =0, int =0, int = 0);
    Time &setTime(int, int, int);
    Time &setHour(int);
    Time &setMinute(int);
    Time &setSecond(int);

    unsigned int getHour() const;
    unsigned int getMinute() const;
    unsigned int getSecond() const;

    void printUniversal() const;
    void printStandard() const;
    // Time(/* args */);
    ~Time();
};

#endif
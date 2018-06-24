#include <iostream>
#include <stdexcept>
#include "Time.h"

using namespace std;

Time::Time(int hour, int minute, int second)
{
    this->setTime(hour, minute, second);
}

Time & Time::setTime(int hour, int minute, int second) {
    this->setHour(hour);
    this->setMinute(minute);
    this->setSecond(second);
    return *this;
}

Time &Time::setHour(int hour) {
    if (hour >= 0 && hour < 24) {
        this->hour = hour;
    } else {
        throw invalid_argument("hour must be 0-23");
    }
    return *this;
}

Time &Time::setMinute(int minute) {
    if (minute >= 0 && minute < 60) {
        this->minute = minute;
    } else {
        throw invalid_argument("minute must be 0-59");
    }
    return *this;
}

Time &Time::setSecond(int second) {
    if (second >= 0 && second < 60) {
        this->second = second;
    } else {
        throw invalid_argument("second must be 0-59");
    }
    return *this;
}

void Time::printStandard() const {
    cout << "standard: " << hour << " - " << minute << " - " << second << endl;
}

Time::~Time()
{
}

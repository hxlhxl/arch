#include <iostream>
#include <stdexcept>
#include "Time.h"

using namespace std;

Time::Time(int hr, int min, int s) {
    setTime(hr, min, s);
}

void Time::setTime(int hr, int min, int s) {
    if ((hr >= 0 && hr <= 23) && (min >= 0 && min <= 59) && (s >= 0 && s <= 59)) {
        hour = hr;
        minute = min;
        second = s;
    } else {
        throw invalid_argument(
            "hr min or s out of range!"
        );
    }

}

unsigned int Time::getHour() const {
    return hour;
}

unsigned int &Time::badSetHour(int hh) {
    if (hh >= 0 && hh < 24) {
        hour = hh;
    } else {
        throw invalid_argument("hour must be --23");
    }
    return hour;
}
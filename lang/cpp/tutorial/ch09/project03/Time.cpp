#include <iostream>
#include <iomanip>
#include <stdexcept>
#include "Time.h"

using namespace std;

// Time::Time():hour(0), minute(0), second(0) {

// }
Time::Time(int _hour) {
    Time(_hour, 0, 0);
}

Time::Time(int _hour, int _minute, int _second) {
    setTime(_hour, _minute, _second);
    publicData = 1000;
}
// Time::Time(int _hour):minute(0), second(0) {
//     hour = _hour;
// }
void Time::setTime(int _hour, int _minute, int _second) {
    if ( (_hour >= 0 && _hour <= 23) && (_minute >= 0 && _minute <= 59) && (_second >= 0 && _second <= 59)) {
        hour = _hour;
        minute = _minute;
        second = _second;
    } else {
        throw invalid_argument(
            "hour minute or second out of range"
        );
    }
}

void Time::printUniversal() const {
    cout << setfill('0') << setw(2) << hour << ":" << setw(2) << minute << ":" << setw(2) << second << endl;
}

void Time::printStandard() const {
    cout << ((hour == 0 || hour == 12) ? 12 : hour %12) << ":" << setfill('0') << setw(2) << minute << ":" << setw(2) << second << endl;
}
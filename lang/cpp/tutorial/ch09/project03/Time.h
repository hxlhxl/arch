
// #ifndef __TIME_H__
// #define __TIME_H__

class Time {
    public:
        Time();
        Time(int);
        Time(int, int);
        Time(int, int, int);
        // explicit Time(int = 0, int = 0, int = 0);
        void setTime(int, int, int);
        
        void setHour(int);
        void setMinute(int);
        void setSecond(int);
        
        unsigned int getHour() const;
        unsigned int getMinute() const;
        unsigned int getSecond() const;

        void printUniversal() const;    // universal-time format
        void printStandard() const; // standard-time format
        int publicData;

    private:
    
        unsigned int hour;      // 0-23
        unsigned int minute;    // 0-59
        unsigned int second;    // 0-59
};

// #endif
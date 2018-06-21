#ifndef __EMPLOYEE_H__
#define __EMPLOYEE_H__

#include <string>
#include "Date.h"

class Employee
{
    public:
        Employee(const std::string &, const std::string &, const Date &, const Date &);
        void print() const;
        ~Employee();
    private:
        std::string firstName;
        std::string lastName;
        const Date birthDate;
        const Date hireDate;
};

#endif
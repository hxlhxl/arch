#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct person {
    char first[32];
    char last[32];
    int year;
    double ppg;
};

int main() {
    struct person class[54];
    class[0].year = 2006;
    class[0].ppg = 5.2;
    strcpy(class[0].first, "Jane");
    strcpy(class[0].last, "Doe");
    printf("class[0]'s name is: %s %s", class[0].first, class[0].last);
    printf("\n-----------------------------------\n");
    struct person *huaxiong;    // 结构体变量需要初始化，否则就是野指针，出现coredump(segment falut)
    // struct person *huaxiong = (struct person *)malloc(sizeof(struct person));
    huaxiong->year = 1993;
    huaxiong->ppg = 9.9;
    // printf("typeof %", typeof(huaxiong->first));
    strcpy(huaxiong->first, "hua");
    strcpy(huaxiong->last, "xiong");
    printf("huaxiong's name is: %s %s", huaxiong->first, huaxiong->last);

    return(0);
}
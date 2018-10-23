#include <stdlib.h>
#include <stdio.h>
#include <strings.h>
#include <inttypes.h>

#include "units.h"


typedef struct {
    int scale;
    char *base;
    char *units[];
} units;

units time_units_us = {
    .scale = 1000,
    .base  = "us",
    .units = { "ms", "s", NULL }
};

units time_units_s = {
    .scale = 60,
    .base  = "s",
    .units = { "m", "h", NULL }
};

units binary_units = {
    .scale = 1024,
    .base  = "",
    .units = { "K", "M", "G", "T", "P", NULL }
};

units metric_units = {
    .scale = 1000,
    .base  = "",
    .units = { "k", "M", "G", "T", "P", NULL }
};



static int scan_units(char *s, uint64_t *n, units *m) {
    uint64_t base, scale = 1;
    char unit[3] = { 0, 0, 0 };
    int i, c;

    if ((c = sscanf(s, "%"SCNu64"%2s", &base, unit)) < 1) return -1;

    if (c == 2 && strncasecmp(unit, m->base, 3)) {
        for (i = 0; m->units[i] != NULL; i++) {
            scale *= m->scale;
            if (!strncasecmp(unit, m->units[i], 3)) break;
        }
        if (m->units[i] == NULL) return -1;
    }

    *n = base * scale;
    return 0;
}



int scan_metric(char *s, uint64_t *n) {
    return scan_units(s, n, &metric_units);
}

int scan_time(char *s, uint64_t *n) {
    return scan_units(s, n, &time_units_s);
}


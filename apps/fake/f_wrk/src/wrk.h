#ifndef WRK_H
#define WRK_H

// #include <inttypes.h>
// #include <sys/types.h>

#include "http_parser.h"

#define RECVBUF  8192

#define MAX_THREAD_RATE_S    10000000
#define SOCKET_TIMEOUT_MS    2000
#define RECORD_INTERVAL_MS   100

extern const char *VERSION;

#endif  /* WRK_H */

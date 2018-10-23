gcc -std=c99 -Wall -O2 -D_REENTRANT \
    -D_POSIX_C_SOURCE=200112L -D_BSD_SOURCE -D_DEFAULT_SOURCE \
    -ldl \
    -lpthread -lm -lssl -lcrypto \
    -Wl,-E \
    -I/usr/include/openssl \
    -L/usr/lib \
    wrk.c zmalloc.c units.c
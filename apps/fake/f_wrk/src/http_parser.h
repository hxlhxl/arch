#ifndef http_parser_h
#define http_parser_h

    #ifdef __cplusplus
    extern "C" {
    #endif

#define HTTP_PARSER_VERSION_MAJOR 2
#define HTTP_PARSER_VERSION_MINOR 7
#define HTTP_PARSER_VERSION_PATCH 1

#include <stddef.h>
#if defined(_WIN32) && !defined(__MINGW32__) && \
  (!defined(_MSC_VER) || _MSC_VER<1600) && !defined(__WINE__)
    #include <BaseTsd.h>
    typedef __int8 int8_t;
    typedef unsigned __int8 uint8_t;
    typedef __int16 int16_t;
    typedef unsigned __int16 uint16_t;
    typedef __int32 int32_t;
    typedef unsigned __int32 uint32_t;
    typedef __int64 int64_t;
    typedef unsigned __int64 uint64_t;
#else
    #include <stdint.h>
#endif


enum http_parser_url_fields {
    UF_SCHEMA       = 0,
    UF_HOST         = 1,
    UF_PORT         = 2,
    UF_PATH         = 3,
    UF_QUERY        = 4,
    UF_FRAGMENT     = 5,
    UF_USERINFO     = 6,
    UF_MAX          = 7
};

struct http_parser_url {
    uint16_t field_set;
    uint16_t port;

    struct {
        uint16_t off;
        uint16_t len;
    } field_data[UF_MAX];
};

    #ifdef __cplusplus
    }
    #endif

#endif
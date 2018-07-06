pacman -S libcurl-compat
pacman -S uriparser
https://github.com/bbcarchdev/liburi#building-from-source
    ./configure --prefix=/usr/local
pacman -S libuv


gcc index.c -lcspider -lxml2 -I/usr/include/libxml2
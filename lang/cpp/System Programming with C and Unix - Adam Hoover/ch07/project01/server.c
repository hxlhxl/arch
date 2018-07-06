#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define BUFSIZE 1024
#if 0
// internet address
struct in_addr {
    unsigned int s_addr;
};
// internet style socket address
struct sockaddr_in {
    unsigned short int sin_family;  // Address family
    unsigned short int sin_port;    // Port number
    struct in_addr sin_addr;        // IP address
    unsigned char sin_zero[...];    // Pad to size of 'struct sockaddr'
}
// struct exported from netdb.h
// domain name service host entry
struct hostent {
    char *h_name;       // official name of host
    char **h_aliases;   // alias list
    int h_addrtype;     // host address type
    int h_length;       // length of addresss
    char **h_addr_list; // list of addresses
}
#endif

void error(char *msg) {
    perror(msg);
    exit(1);
}

int main(int argc, char **argv) {
    int listenfd;   // listening socket
    int connfd;     // connection socket
    int portno;     // port to listen on
    int clientlen;  // byte size of client's address
    struct sockaddr_in serveraddr;  // server's addr
    struct sockaddr_in clientaddr;  // client addr
    struct hostent *hostp;  // client host info
    char buf[BUFSIZE];  // message buffer
    char *hostaddrp;    // dotted decimal host addr string
    int optval;         // flag value for setsockopt
    int n;              // message byte size

    if (argc != 2) {
        fprintf(stderr, "usage: %s <port>\n", argv[0]);
        exit(1);
    }
    portno = atoi(argv[1]);

    listenfd = socket(AF_INET, SOCK_STREAM, 0);
    if (listenfd < 0) {
        error("ERROR opening socket");
    }

    optval = 1;
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, (const void *)&optval, sizeof(int));
    
    bzero((char *)&serveraddr, sizeof(serveraddr));
    serveraddr.sin_family = AF_INET;    // we are using the Internet
    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY); // accept reqs to any IP addr
    serveraddr.sin_port = htons((unsigned short)portno); // port to listen on

    if (bind(listenfd, (struct sockaddr*)&serveraddr, sizeof(serveraddr)) < 0) {
        error("ERROR on binding");
    }

    if (listen(listenfd, 5) < 0) {
        error("ERRPR on listenning");
    }

    clientlen = sizeof(clientaddr);
    
    while(1) {
        connfd = accept(listenfd, (struct sockaddr*)&clientaddr, &clientlen);
        if (connfd < 0) {
            error("ERROR on accept");
        }

        hostp = gethostbyaddr((const char*)&clientaddr.sin_addr.s_addr, sizeof(clientaddr.sin_addr.s_addr), AF_INET);

        if (hostp == NULL) {
            error("ERROR on gethostbyaddr");
    
        }

        hostaddrp = inet_ntoa(clientaddr.sin_addr);

        if (hostaddrp == NULL) {
            error("ERROR on inet_ntoa\n");
        }

        printf("server established connection with %s (%s)\n", hostp->h_name, hostaddrp);

        // read
        bzero(buf, BUFSIZE);
        n = read(connfd, buf, BUFSIZE);
        if (n < 0) {
            error("ERROR reading from socket");
        }
        printf("server received %d butes: %s", n, buf);

        n = write(connfd, buf, strlen(buf));
        if (n < 0) {
            error("ERROR writing to socket");
        }
        close(connfd);
    }
}
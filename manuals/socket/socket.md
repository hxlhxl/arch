socket是一种进程间通信的方式。
socket的通信是以Address Family作为基础的，进程间通信的载体是Address Family，比如AF_INET, AF_IPX，不同的Address Family，应用的方面可能不同，比如有Bluetooth、IPX等。
而在Address Family的基础上，通信可以采用不同的策略，常见的策略有：
    Datagram socket
    Stream socket
    Raw socket
    Other
在Address Family和策略的基础上，还需要具体的协议去实现，因此就会有TCP、UDP等这种协议出现。

NAME
    socket - create an endpoint for communication
SYNOPSIS
    #include <sys/types.h>
    #include <sys/socket.h>

    int socket(int domain, int type, int protocol);

DESCRIPTION
    socket() creates an endpoint for communication and returns a file descriptor that refers to that endpoint. The file descriptor returned by a successful call will be the lowest-numbered file descriptor not currently open for the process.

    The domain argument specifies a communication domain; this selects the protocol family which will be used for communication. These families are defined in <sys/socket.h>. The currently understood formats include: (here AF means `address family`, and only particular address type can communicate with socket when domain is assigned)
    Name                Purpose                                 Man Page
    AF_UNIX, AF_LOCAL   Local communication                     unix(7)
    AF_INET             IPv4 Internet protocols                 ip(7)
    AF_INET6            IPv6 Internet protocols                 ipv6(7)
    AF_IPX              IPX - Novell protocols
    AF_NETLINK          Kernel user interface device            netlink(7)
    AF_PACKET           Low level packet interface              packet(7)
    ...

    The socket has the indicated type, which specifies the communication semantics. Currently defined types are:
    SOCK_STREAM     Provides sequenced, reliable, two-way, connection-based byte streams. An out-of-band data transmission mechanism may be supported
    SOCK_DGRAM      Supports datagrams (connectionless, unreliable message of a fixed maximum length)
    SOCK_SEQPACKET  Provides a sequenced, reliable, two-way connection-based data transmission path for datagrams of fixed maximum length; a consumer is required to read an entire packet wieh each input system call.
    SOCK_RAW        Provides raw network protocol access.
    SOCK_RDM        Provides a reliable datagram layer that does not guarantee ordering.
    SOCK_PACKET     Obsolete and should not be used in new programs;
    
    Some socket types may not be implemented by all protocol families.

    The protocol specifies a particular protocol to be used with the socket. Normally only a single protocol exists to support a particular socket type within a given protocol family, in which case protocol can be specified as 0. However, it is possible that many protocols may exists, in which case a particular protocol must be specified in this manner. The protocol number to use is specific to the "communication domain" in which communication is to take place.

    Sockets of type SOCK_STREAM are full-duplex byte streams. They do not preserve record boundaries. A stream socket must be in a connected state before any data may be sent or received on it. A connection to another socket is created with a connect(2) call. Once connected, data may be transferred using read(2) and write(2) calls ro some variant of the send(2) and recv(2) calls. When a session has been completed a close(2) may be performed. Out-of-band data may also be transmitted as described in send(2) and received as described in recv(2).

    The communications protocols which implement a SOCK_STREAM ensure that data is not loast or duplicated. If a piece of data for which the peer protocol has buffer space cannot be successfully transmitted within a reasonable length of time, then the connection is considered to be dead. When SO_KEEPALIVE is enabled on the socket the protocol checks in a protocol-specific manner if the other end is still alive. A SIGPIPE signal is raised if a process sends or receives on a broken stream; this causes naive processes, which do not handle the signal, to exit. SOCK_SEQPACKET sockets employ the same system calls as SOCK_STREAM sockets. The only difference is that read(2) calls will return only the amount of data requested, and any data remainng in the arriving packet will be discard. Alose all message boundaries in incoming datagrams are preserved.

    SOCK_DGRAM and SOCK_RAW sockets allow sending of datagrams to correspongdents named in sendto(2) calls. Data-grams are generally received with recvfrom(2), which returns the next datagram along with the address of its sender.

    SOCK_PACKET is an obsolete socket type to receive raw packets directly from the device driver.

    An fcntl(2) F_SETOWN operation can be userd to specify a process or process group to receive a SIGURG signal when the out-of-band data arrives or SIGPIPE signal when a SOCK_STREAM connection breaks unexpectedly. This operation may also be used to set the process or process group that receives the IO and asynchronous notification of IO events via SIGIO. Using F_SETOWN is equivalent to an ioctl(2) call with the FIOSETOWN or SIOCSPGRP argument

    When the network signals an error condition the the protocol module(e.g. using an ICMP messgae for IP) the pending error flag is set for the socket. The next operation on this socket will return the error code of the pending error. For some protocols it is possible to enable a per-socket error queue to retrieve detailed information about the error

    The operation of sockets is controlled by socket level options. These options are defined in <sys/socket.h>. The functions setsockopt(2) and getsockopt(2) are used to set and get options, respectively.
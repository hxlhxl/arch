
NAME
       listen — listen for socket connections and limit the queue of incoming connections

SYNOPSIS
       #include <sys/socket.h>

       int listen(int socket, int backlog);

DESCRIPTION
       The listen() function shall mark a connection-mode socket, specified by the socket argument, as accepting connections.

       The backlog argument provides a hint to the implementation which the implementation shall use to limit the number of outstanding connections in the socket's listen queue. Implementations may impose a limit on backlog and silently reduce the speci‐
       fied value. Normally, a larger backlog argument value shall result in a larger or equal length of the listen queue. Implementations shall support values of backlog up to SOMAXCONN, defined in <sys/socket.h>.

       The implementation may include incomplete connections in its listen queue. The limits on the number of incomplete connections and completed connections queued may be different.

       The implementation may have an upper limit on the length of the listen queue—either global or per accepting socket. If backlog exceeds this limit, the length of the listen queue is set to the limit.

       If listen() is called with a backlog argument value that is less than 0, the function behaves as if it had been called with a backlog argument value of 0.

       A backlog argument of 0 may allow the socket to accept connections, in which case the length of the listen queue may be set to an implementation-defined minimum value.

       The socket in use may require the process to have appropriate privileges to use the listen() function.

RETURN VALUE
       Upon successful completions, listen() shall return 0; otherwise, −1 shall be returned and errno set to indicate the error.

ERRORS
       The listen() function shall fail if:

       EBADF  The socket argument is not a valid file descriptor.

       EDESTADDRREQ
              The socket is not bound to a local address, and the protocol does not support listening on an unbound socket.

       EINVAL The socket is already connected.

       ENOTSOCK
              The socket argument does not refer to a socket.

       EOPNOTSUPP
              The socket protocol does not support listen().

       The listen() function may fail if:

       EACCES The calling process does not have appropriate privileges.

       EINVAL The socket has been shut down.

       ENOBUFS
              Insufficient resources are available in the system to complete the call.

       The following sections are informative.

EXAMPLES
       None.

APPLICATION USAGE
       None.

RATIONALE
       None.

FUTURE DIRECTIONS
       None.

SEE ALSO
       accept(), connect(), socket()

       The Base Definitions volume of POSIX.1‐2008, <sys_socket.h>

COPYRIGHT
       Portions of this text are reprinted and reproduced in electronic form from IEEE Std 1003.1, 2013 Edition, Standard for Information Technology -- Portable Operating System Interface (POSIX), The Open Group Base Specifications Issue 7, Copyright (C)
       2013  by  the Institute of Electrical and Electronics Engineers, Inc and The Open Group.  (This is POSIX.1-2008 with the 2013 Technical Corrigendum 1 applied.) In the event of any discrepancy between this version and the original IEEE and The Open
       Group Standard, the original IEEE and The Open Group Standard is the referee document. The original Standard can be obtained online at http://www.unix.org/online.html .

       Any typographical or formatting errors that appear in this page are most likely to have been introduced during the conversion of the source files  to  man  page  format.  To  report  such  errors,  see  https://www.kernel.org/doc/man-pages/report‐
       ing_bugs.html .

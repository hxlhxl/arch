# socket.socket()
创建一个socket对象
# socket.socketpair()
创建一堆socket对象
# socket.fromfd()
从打开的文件fd创建一个socket对象
# socket.gethostname()
返回当前的hostname
# socket.gethostbyname()
map a hostname to  its IP number
# socket.gethostbyaddr()
map an IP number or hostname to DNS info
# socket.getservbyname()
map a service name and a protocol name to a port number
# socket.getprotobyname()
map a protocol name (e.g 'tcp') to a number
# ntohs(), ntohl()
把16/32bit的int数字转换成
convert 16, 32 bit int from network to host byte order
# ntons(),ntonl()
convert 16, 32 bit int from host to network byte order
# inet_aton()
convert IP addr string (123.45.67.89) to 32-bit packed format
# inet_ntoa()
convert 32-bit packed format IP to string (123.45.67.89)
# ssl()
secure socket layer support (only available if configured)
# socket.getdefaulttimeout()
get the default timeout value
# socket.setdefaulttimeout()
set the default timeout value
# create_connection()
connects to an address,with an optional timeout and optional source address

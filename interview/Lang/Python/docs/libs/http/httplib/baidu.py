#!/usr/bin/env python
# coding: utf8

import socket
#from urllib.parse import quote_plus
from urllib import quote_plus
from pprint import pprint
request_text = '''\
GET / HTTP/1.1\r\n\
Host: www.baidu.com:80\r\n\
User-Agent: li (Foundations of Python Network Programming)\r\n\
Connection: close\r\n\
\r\n\
'''

sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
sock.connect(('www.baidu.com', 80))

request = request_text
sock.sendall(request.encode('ascii'))


fp = sock.makefile('rb')
line = fp.readline(65536 + 1)
x = [version, status, reason] = line.split(None, 2)

pprint(line)

# with open('s.txt','w') as fw:
#     fw.write(fp.read())
# raw_reply = b''
# while True:
#     more = sock.recv(4096)
#     if not more:
#         break
#     raw_reply += more
# print(raw_reply.decode('utf-8'))


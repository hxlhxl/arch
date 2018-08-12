#!/usr/bin/env python
# -*- coding: utf-8 -*-

import socket
import StringIO
import sys

class WSGIServer(object):

	address_family = socket.AF_INET
	socket_type = socket.SOCK_STREAM
	request_queue_size = 1

	def __init__(self, server_address):

		# 创建socket，利用socket获取客户端的请求
		self.listen_socket = listen_socket = socket.socket(self.address_family, self.socket_type)
        # 设置socket的工作模式
		listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
		# 绑定socket地址
		listen_socket.bind(server_address)
		# socket active， 监听文件描述符
		listen_socket.listen(self.request_queue_size)

		# 获得serve的host name和port
		host, port = self.listen_socket.getsockname()[:2]
		self.server_name = socket.getfqdn(host)
		self.server_port = port

		self.headers_set = []

	def set_app(self, application):
		self.application = application 

    #启动WSGI server服务，不停的监听并获取socket数据。
	def serve_forever(self):
		listen_socket = self.listen_socket
		while True:
			self.client_connection, client_address = listen_socket.accept() #接受客户端请求
            #处理请求
			self.handle_one_request()

	def handle_one_request(self):
		self.request_data = request_data = self.client_connection.recv(1024)
		self.parse_request(request_data)
		# print(''.join(
  # '< {line}\n'.format(line=line)
  # for line in request_data.splitlines()
  # ))
  		# Construct environment dictionary using request data
		env = self.get_environ()
      
        #给flask\tornado传递两个参数，environ，start_response
		result = self.application(env, self.start_response)
		self.finish_response(result)

    #处理socket的http协议
	def parse_request(self, data):
		format_data = data.splitlines()
		if len(format_data):
			request_line = data.splitlines()[0]
			request_line = request_line.rstrip('\r\n')
			(self.request_method, self.path, self.request_version) = request_line.split() ## ['GET', '/', 'HTTP/1.1']

    # 获取environ数据并设置当前server的工作模式
	def get_environ(self):
		env = {}
		env['wsgi.version']      = (1, 0)
		env['wsgi.url_scheme']   = 'http'
		env['wsgi.input']        = StringIO.StringIO(self.request_data)
		env['wsgi.errors']       = sys.stderr
		env['wsgi.multithread']  = False
		env['wsgi.multiprocess'] = False
		env['wsgi.run_once']     = False
		# Required CGI variables
		env['REQUEST_METHOD']    = self.request_method    # GET
		env['PATH_INFO']         = self.path              # /hello
		env['SERVER_NAME']       = self.server_name       # localhost
		env['SERVER_PORT']       = str(self.server_port)  # 8888
		return env

	def start_response(self, status, response_headers, exc_info=None):
		server_headers = [('Date', 'Tue, 31 Mar 2015 12:54:48 GMT'), ('Server', 'WSGIServer 0.2')]
		self.headers_set = [status, response_headers + server_headers]

    #把application返回给WSGI的数据返回给客户端。
	def finish_response(self, result):
		try:
			status, response_headers = self.headers_set
			response = 'HTTP/1.1 {status}\r\n'.format(status=status)
			for header in response_headers:
				response += '{0}: {1}\r\n'.format(*header)
			response += '\r\n'
			for data in result:
				response += data
			self.client_connection.sendall(response)
			print(''.join(
                '> {line}\n'.format(line=line)
                for line in response.splitlines()
            ))
		finally:
			self.client_connection.close()

SERVER_ADDRESS = (HOST, PORT) = '', 8888

def make_server(server_address, application):
	server = WSGIServer(server_address)
	server.set_app(application)
	return server


if __name__ == '__main__':
	if len(sys.argv) < 2:
		sys.exit('Provide a WSGI application object as module:callable')
	app_path = sys.argv[1]
	module, application = app_path.split(':') # 第一个参数是文件名，第二个参数时长文件内app的命名
	module = __import__(module)
	application = getattr(module, application) # getattr(object, name[, default]) -> value
	httpd = make_server(SERVER_ADDRESS, application)
	print('WSGIServer: Serving HTTP on port {port} ...\n'.format(port=PORT))
	httpd.serve_forever()


''' telnet详情
(py2venv) [husa@ArchLinux-husa libs]$ telnet -E 127.0.0.1 8888
Trying 127.0.0.1...
Connected to 127.0.0.1.
Escape character is 'off'.
GET / HTTP/1.1
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 12
Date: Tue, 31 Mar 2015 12:54:48 GMT
Server: WSGIServer 0.2

hello world!Connection closed by foreign host.
'''
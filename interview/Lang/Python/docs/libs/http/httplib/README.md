1. 在client端实现了HTTP和HTTPS协议，HTTPS的使用必须在socket模块支持SSL编译的情况下，在Python 3中为http.client模块，Python 2中为httplib模块




# httplib.HTTPConnection
一个实例就代表客户端与服务器端之间的一次通信。
```
class httplib.HTTPConnection(host[, port[, strict[, timeout[, source_address]]]])
An HTTPConnection instance represents one transaction with an HTTP server. It should be instantiated passing it a host and optional port number. If no port number is passed, the port is extracted from the host string if it has the form host:port, else the default HTTP port (80) is used. When true, the optional parameter strict (which defaults to a false value) causes BadStatusLine to be raised if the status line can’t be parsed as a valid HTTP/1.0 or 1.1 status line. If the optional timeout parameter is given, blocking operations (like connection attempts) will timeout after that many seconds (if it is not given, the global default timeout setting is used). The optional source_address parameter may be a tuple of a (host, port) to use as the source address the HTTP connection is made from.
```
## httplib.HTTPConnection.request(method, url[, body[, headers]])¶
This will send a request to the server using the HTTP request method method and the selector url. If the body argument is present, it should be a string of data to send after the headers are finished. Alternatively, it may be an open file object, in which case the contents of the file is sent; this file object should support fileno() and read() methods. The headers argument should be a mapping of extra HTTP headers to send with the request.

If one is not provided in headers, a Content-Length header is added automatically for all methods if the length of the body can be determined, either from the length of the str representation, or from the reported size of the file on disk. If body is None the header is not set except for methods that expect a body (PUT, POST, and PATCH) in which case it is set to 0.
## HTTPConnection.set_tunnel(host, port=None, headers=None)
Set the host and the port for HTTP Connect Tunnelling. Normally used when it is required to do HTTPS Connection through a proxy server.

The headers argument should be a mapping of extra HTTP headers to send with the CONNECT request.

## httplib.HTTPConnection.connect()
Connect to the server specified when the object was created.
## httplib.HTTPConnection.close()
Close the connection to the server.
## httplib.HTTPConnection.send(data)
Send data to the server. This should be used directly only after the endheaders() method has been called and before getresponse() is called.
## HTTPConnection.putrequest(request, selector[, skip_host[, skip_accept_encoding]])
This should be the first call after the connection to the server has been made. It sends a line to the server consisting of the request string, the selector string, and the HTTP version (HTTP/1.1). To disable automatic sending of Host: or Accept-Encoding: headers (for example to accept additional content encodings), specify skip_host or skip_accept_encoding with non-False values.



## httplib.HTTPConnection.endheaders(message_body=None)
Send a blank line to the server, signalling the end of the headers. The optional message_body argument can be used to pass a message body associated with the request. The message body will be sent in the same packet as the message headers if it is string, otherwise it is sent in a separate packet.
## httplib.HTTPConnection.getresponse()
Should be called after a request is sent to get the response from the server. Returns an HTTPResponse instance.


## httplib.HTTPResponse

## httplib.HTTPResponse.read([amt])
Reads and returns the response body, or up to the next amt bytes.

## httplib.HTTPResponse.getheader(name[, default])
Get the contents of the header name, or default if there is no matching header.

## httplib.HTTPResponse.getheaders()
Return a list of (header, value) tuples.

## httplib.HTTPResponse.fileno()
Returns the fileno of the underlying socket.

## httplib.HTTPResponse.msg
A mimetools.Message instance containing the response headers.

## httplib.HTTPResponse.version
HTTP protocol version used by server. 10 for HTTP/1.0, 11 for HTTP/1.1.

## httplib.HTTPResponse.status
Status code returned by server.

## httplib.HTTPResponse.reason
Reason phrase returned by server.
TCP Header
---


![](http://www.tcpipguide.com/free/diagrams/tcpsegmentformat.png)

Source Port

	2
	Source Port: The 16-bit port number of the process that originated the TCP segment on the source device. This will normally be an ephemeral (client) port number for a request sent by a client to a server, or a well-known/registered (server) port number for a reply from a server to a client.

Destination Port
	
	2
	Destination Port: The 16-bit port number of the process that is the ultimate intended recipient of the message on the destination device. This will usually be a well-known/registered (server) port number for a client request, or an ephemeral (client) port number for a server reply.

Sequence Number

	4
	Sequence Number: For normal transmissions, the sequence number of the first byte of data in this segment. In a connection request (SYN) message, this carries the initial sequence number (ISN) of the source TCP. The first byte of data will be given the next sequence number after the contents of this field, as described in the topic on sequence number synchronization.

Acknowledgment Number

	4
	Acknowledgment Number: When the ACK bit is set, this segment is serving as an acknowledgment (in addition to other possible duties) and this field contains the sequence number the source is next expecting the destination to send. See the topic describing TCP data transfer for details.

Data Offset

	1/2(4 bits)
	Data Offset: Specifies the number of 32-bit words of data in the TCP header. In other words, this value times four equals the number of bytes in the header, which must always be a multiple of four. It is called a “data offset” since it indicates by how many 32-bit words the start of the data is offset from the beginning of the TCP segment.

Reserved

	3/4(6 bits)
	Reserved: 6 bits reserved for future use; sent as zero.


Control Bits

	3/4(6 bits)
![](http://www.tcpipguide.com/free/aa200ab4.png)
 

Window

	2
	Window: Indicates the number of octets of data the sender of this segment is willing to accept from the receiver at one time. This normally corresponds to the current size of the buffer allocated to accept data for this connection. This field is, in other words, the current receive window size for the device sending this segment, which is also the send window for the recipient of the segment. See the data transfer mechanics topic for details.

Checksum

	2
	Checksum: A 16-bit checksum for data integrity protection, computed over the entire TCP datagram plus a special “pseudo header” of fields. It is used to protect the entire TCP segment against not just errors in transmission, but also errors in delivery. Optional alternate checksum methods are also supported.

Urgent Pointer

	2
	Urgent Pointer: Used in conjunction with the URG control bit for priority data transfer. This field contains the sequence number of the last byte of urgent data. See the priority data transfer topic for details.

Options

	Variable
![](http://www.tcpipguide.com/free/aa200b6a.png)

 
Padding

	Variable
	Padding: If the Options field is not a multiple of 32 bits in length, enough zeroes are added to pad the header so it is a multiple of 32 bits.

Data

	Variable
	Data: The bytes of data being sent in the segment.




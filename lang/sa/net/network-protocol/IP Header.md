IP Header
---




IP Header

![](http://www.tcpipguide.com/free/diagrams/ipformat.png)




Version

	(4 bits)
	Version: Identifies the version of IP used to generate the datagram. For IPv4, this is of course the number 4. The purpose of this field is to ensure compatibility between devices that may be running different versions of IP. In general, a device running an older version of IP will reject datagrams created by newer implementations, under the assumption that the older version may not be able to interpret the newer datagram correctly.

IHL

	(4 bits)
	Internet Header Length (IHL): Specifies the length of the IP header, in 32-bit words. This includes the length of any options fields and padding. The normal value of this field when no options are used is 5 (5 32-bit words = 5*4 = 20 bytes). Contrast to the longer Total Length field below.

TOS

	(8 bits)
	Type Of Service (TOS): A field designed to carry information to provide quality of service features, such as prioritized delivery, for IP datagrams. It was never widely used as originally defined, and its meaning has been subsequently redefined for use by a technique called Differentiated Services (DS). 

TL

	(16 bits)
	Total Length (TL): Specifies the total length of the IP datagram, in bytes. Since this field is 16 bits wide, the maximum length of an IP datagram is 65,535 bytes, though most are much smaller.

Identification

	(16 bits)
	Identification: This field contains a 16-bit value that is common to each of the fragments belonging to a particular message; for datagrams originally sent unfragmented it is still filled in, so it can be used if the datagram must be fragmented by a router during delivery. This field is used by the recipient to reassemble messages without accidentally mixing fragments from different messages. This is needed because fragments may arrive from multiple messages mixed together, since IP datagrams can be received out of order from any device.


Flags

	R
		Reserved:Not used

	DF
		When set to 1,specifies that the datagram shoule not be fragmented

	MF
		When set to 0,indicates the last fragment in a message;when set to 1,indicates that more fragments are yet to come in the fragmented message.


Fragment Offset

	(13 bits)
	Fragment Offset: When fragmentation of a message occurs, this field specifies the offset, or position, in the overall message where the data in this fragment goes. It is specified in units of 8 bytes (64 bits). The first fragment has an offset of 0. Again, see the discussion of fragmentation for a description of how the field is used.


Protocol

	(8 bits)
		0
			reserved
		1
			ICMP
		2
			IDMP
		3
			GGP
		6
			TCP
		17
			UDP



Header Checksum

	(16 bits)
	Header Checksum: A checksum computed over the header to provide basic protection against corruption in transmission. This is not the more complex CRC code typically used by data link layer technologies such as Ethernet; it's just a 16-bit checksum. It is calculated by dividing the header bytes into words (a word is two bytes) and then adding them together. The data is not checksummed, only the header. At each hop the device receiving the datagram does the same checksum calculation and on a mismatch, discards the datagram as damaged.

Source Address

	(32bits)
	Source Address: The 32-bit IP address of the originator of the datagram. Note that even though intermediate devices such as routers may handle the datagram, they do not normally put their address into this field—it is always the device that originally sent the datagram.

Destination Address

	(32 bits)
	Destination Address: The 32-bit IP address of the intended recipient of the datagram. Again, even though devices such as routers may be the intermediate targets of the datagram, this field is always for the ultimate destination.

Options

	Variable
	Options: One or more of several types of options may be included after the standard headers in certain IP datagrams.

Padding

	Variable
	Padding: If one or more options are included, and the number of bits used for them is not a multiple of 32, enough zero bits are added to “pad out” the header to a multiple of 32 bits (4 bytes).

Data

	Variable
	Data: The data to be transmitted in the datagram, either an entire higher-layer message or a fragment of one.



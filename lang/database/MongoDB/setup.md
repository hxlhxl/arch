[husa@archlinux ~]$ sudo pacman -S mongodb
[husa@archlinux ~]$ sudo vim /etc/mongodb.conf
```
# See http://www.mongodb.org/display/DOCS/File+Based+Configuration for format details
# Run mongod --help to see a list of options

bind_ip = 0.0.0.0
quiet = true
dbpath = /var/lib/mongodb
logpath = /var/log/mongodb/mongod.log
logappend = true
auth = true
```
[husa@archlinux ~]$ sudo systemctl start mongodb.service
[root@archlinux ~]# mongo
MongoDB shell version v3.6.5
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.5
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
> use admin
switched to db admin
> db.createUser({
...     user: "root",
...     pwd: "husa2012",
...     roles: [{role: "__system", db: "admin"}, {role: "readWriteAnyDatabase", db: "admin"}]
... });
Successfully added user: {
	"user" : "root",
	"roles" : [
		{
			"role" : "__system",
			"db" : "admin"
		}
	]
}
> 
bye
// 一定要加上--authenticationDatabase "admin"选项选择授权的数据库
[root@archlinux ~]# mongo -u root -p --authenticationDatabase "admin"
MongoDB shell version v3.6.5
Enter password: 
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.5
> show roles
{
	"role" : "dbAdmin",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
{
	"role" : "dbOwner",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
{
	"role" : "enableSharding",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
{
	"role" : "read",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
{
	"role" : "readWrite",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
{
	"role" : "userAdmin",
	"db" : "test",
	"isBuiltin" : true,
	"roles" : [ ],
	"inheritedRoles" : [ ]
}
> 
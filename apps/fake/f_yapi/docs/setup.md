# 文档
https://yapi.ymfe.org/devops/index.html

[husa@archlinux github.com]$ go get -v github.com/YMFE/yapi
[husa@archlinux yapi]$ npm install --production --registry https://registry.npm.taobao.org
[husa@archlinux yapi]$ cp config_example.json ../config.json
[husa@archlinux yapi]$ vim ../config.json   # 配置数据库、端口和管理员邮箱等。增加一个host配置

```

{
  "host": "0.0.0.0",
  "port": "3002",
  "adminAccount": "huax01@mingyuanyun.com",
  "db": {
    "servername": "127.0.0.1",
    "DATABASE": "yapi",
    "port": 27017,
    "user": "yapi",
    "pass": "yapi",
    "authSource": ""
  },
  "mail": {
    "enable": true,
    "host": "smtp.163.com",
    "port": 465,
    "from": "***@163.com",
    "auth": {
    ¦ "user": "***@163.com",
    ¦ "pass": "*****"
    }
  }
}
```
[root@archlinux ~]# mongo -u root -p --authenticationDatabase "admin"
MongoDB shell version v3.6.5
Enter password: 
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.5
> use yapi
switched to db yapi
> db.createUser({user:"yapi",pwd:"yapi",roles:[{"role":"readWrite","db":"yapi"}]})
Successfully added user: {
	"user" : "yapi",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "yapi"
		}
	]
}

[husa@archlinux yapi]$ npm run install-server
```
> yapi@1.3.22 install-server /home/husa/go/src/github.com/YMFE/yapi
>  node server/install.js

log: mongodb load success...
初始化管理员账号成功,账号名："huax01@***********.com"，密码："ymfe.org"
```

[husa@archlinux yapi]$ vim ./server/app.js
```
// 修改如下行
app.listen(yapi.WEBCONFIG.port, yapi.WEBCONFIG.host);
```


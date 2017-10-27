# 常见操作
## 查看全局已经安装的包
```
[husa@ArchLinux-husa ~]$ npm list -g --depth 0 2> /dev/null
/usr/lib
├── atom-package-manager@1.18.8
├── grunt@1.0.1
├── grunt-cli@1.2.0
├── json-server@0.12.0
├── node-sass@4.5.3
├── npm@5.5.1
├── nrm@1.0.2
└── yarn@0.27.5
```

## 删除全局安装的包
```
[husa@ArchLinux-husa ~]$ sudo npm uninstall swagger-editor swagger-server  swagger-ui -g
```

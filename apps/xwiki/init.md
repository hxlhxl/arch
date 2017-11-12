1. 下载war包
地址： http://www.xwiki.org/xwiki/bin/view/Download/
版本为： 	xwiki-enterprise-web-7.1.1.war

2. 安装tomcat7
pacman -S tomcat7
vim /etc/tomcat7/server.xml
    URIEncoding
    Admin角色等

3. 安装mysql-connector，初始化MySQL
https://dev.mysql.com/downloads/connector/j/5.1.html
http://www.xwiki.org/xwiki/bin/view/Documentation/AdminGuide/Installation/InstallationWAR/InstallationMySQL/
```
mysql -u root -e "create database xwiki default character set utf8 collate utf8_bin"
mysql -u root -e "grant all privileges on *.* to xwiki@localhost identified by 'xwiki'"
```


4. 修改hibernate配置
vim /var/lib/tomcat7/webapps/xwiki/WEB-INF/hibernate.cfg.xml

注释掉HSQLDB，并增加MySQL配置

5. 安装GUI
安装向导中有的

6. 个性化配置
- 管理员
    账号： Admin
    密码： admin
- 超级管理员
    /var/lib/tomcat7/webapps/xwiki/WEB-INF/xwiki.cfg
    账号： Superadmin
    密码： system
- permanet directory
    /var/lib/tomcat7/webapps/xwiki/WEB-INF/xwiki.properties
      set to : environment.permanentDirectory=/var/lib/tomcat7/webapps/xwiki/xwiki-perm-data
- LDAP
    http://www.xwiki.org/xwiki/bin/view/Documentation/AdminGuide/Authentication/

    vim /var/lib/tomcat7/webapps/xwiki/WEB-INF/xwiki.cfg

7. 备份恢复
http://www.xwiki.org/xwiki/bin/view/Documentation/AdminGuide/Backup

```
systemctl restart mariadb
mysql -e "DROP DATABASE xwiki;"
mysql -e "CREATE DATABASE IF NOT EXISTS xwiki DEFAULT CHARACTER SET utf8;"
mysql xwiki --user=root -p < xwiki.sql
```
数据太大可能要修改mysql的配置变量
``` /etc/mysql/my.cnf
[mysqld]
port|   |       = 3306
socket| |       = /run/mysqld/mysqld.sock
skip-external-locking
key_buffer_size = 16M
# 可能在导入数据时出现mysql gone away错误
max_allowed_packet = 1024M
innodb_log_file_size = 1024M
[mysqldump]
quick
# 最大值为1G
max_allowed_packet = 1024M
```


8. 注意事项
tomcat容器默认不会接受编码过的/或者\，所以编辑tomcat7的配置文件：

```
vim /etc/tomcat7/catalina.properties
# 加入下面一行
# CUSTOMIZE
org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
# 重启OK
```
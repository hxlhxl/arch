如何修改内核参数

	/etc/sysctl.conf
	sysctl -p

	搜索发现，该方法已经失效，每次重启参数会重置，正确的要修改的文件是/usr/lib/sysctl.d/50-default.conf

#!/bin/bash
# 
binCmd=$1

libs=$(ldd `which $binCmd`|awk -F"=>" '{print $2}'|awk '{print $1}'|grep -v '^$')
for lib in $libs;do
	libDir=${lib%/*}
	mkdir -pv ${libDir:1} 2> /dev/null
	cp -fa $lib ${libDir:1}
done


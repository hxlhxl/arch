#!/usr/bin/env python
# coding: utf8


import orighttplib
import json

conn = orighttplib.HTTPConnection('www.baidu.com',80)
conn.request('GET','/')

raw_reply = conn.getresponse().read()

reply = raw_reply.decode('utf-8')

print reply


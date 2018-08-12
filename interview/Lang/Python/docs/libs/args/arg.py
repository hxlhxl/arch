#!/usr/bin/env python
# coding: utf8

from optparse import OptionParser,Values


'''
action:
    -store: 存储参数的值
    -store_true: 如果给出参数选项则存储为True或者False
default:默认值
dest:存储参数的值的变量
help: 帮助

返回值：options,args
    其中options是指通过optparse获取到的参数；args是optparse没有解析的参数，是一个数组结构。
'''



def get_parsed_args():
    parser = OptionParser()
    parser.add_option('-A', '--autorestart', action='store_true', default=False,
                      dest='autorestart')
    parser.add_option('-d', '--dd_url', action='store', default=None,
                      dest='dd_url')
    parser.add_option('-u', '--use-local-forwarder', action='store_true',
                      default=False, dest='use_forwarder')
    parser.add_option('-v', '--verbose', action='store_true', default=False,
                      dest='verbose',
                      help='Print out stacktraces for errors in checks')
    parser.add_option('-p', '--profile', action='store_true', default=False,
                      dest='profile', help='Enable Developer Mode')

    try:
        options, args = parser.parse_args()
    except SystemExit:
        # Ignore parse errors
        options, args = Values({'autorestart': False,
                                'dd_url': None,
                                'use_forwarder': False,
                                'verbose': False,
                                'profile': False}), []
    return options, args
if __name__ == '__main__':
    options,args = get_parsed_args()    # main中调用会直接返回这些东西
    print options.profile,options.dd_url,args
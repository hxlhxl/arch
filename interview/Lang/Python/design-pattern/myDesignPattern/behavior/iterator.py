# coding: utf8
'''

traverses a container and accesses the container's elements.
# if return if return if return这种结构可以通过迭代器消除
# yield
'''


from __future__ import print_function

def count_to(count):
    numbers = ['obj1','obj2','obj2','obj4','obj5']
    for number in numbers[:count]:
        yield number

def for_type():
    for number in count_to(5):
        print(number)
def next_type():
    g = count_to(5)
    try:
        while True:
            # 下面两种方法均可
            # number = g.__next__()
            number = next(g)
            print(number)
    except Exception as e:
        print('what is this exception: ',e)
def main():
    for_type()
    print('-----' * 10)
    next_type()

if __name__ == '__main__':
    main()

'''

10进制转n进制

10 -> 12(8)
10 -> 1010(2)


-----------
A  B  C  D  E  F
10 11 12 13 14 15
'''

from stack import Stack

BITMAP = '0123456789ABCDEF'
def divide_by_n(dec_number,n):
    stk = Stack()
    bit = ''
    # while True:
    #     shang = dec_number // n
    #     yushu = dec_number - shang * n
    #     dec_number = shang
    #     stk.push(BITMAP[yushu])
    #     if shang == 0:
    #         break
    while dec_number > 0:
        yushu = dec_number % n
        stk.push(BITMAP[yushu])
        dec_number //= n
    while not stk.is_empty():
        bit += str(stk.pop())
    return bit

if __name__ == '__main__':
    print(divide_by_n(10,2))
    print(divide_by_n(10,8))
    print(divide_by_n(10,10))
    print(divide_by_n(10,14))
    print(divide_by_n(10,16))
    print(divide_by_n(100000,16))

# coding: utf8

def solution(arr):
    s0 = arr[0]
    for n in arr:
        if n > s0:
            s0 = n
    print('max number is: ',s0)
    s1 = arr[0]
    for n in arr:
        if n > s1 and n < s0:
            s1 = n
    print('second max number is: ',s1)
    return s1

if __name__ == '__main__':
    arr = [1,2,5,4,-1]
    solution(arr)
# coding: utf8

def solution(arr):
    s = arr[0]
    for n in arr:
        if n > s:
            s = n
    print('max number is: ',s)
    return s        

if __name__ == '__main__':
    arr = [1,2,5,4,-1]
    solution(arr)
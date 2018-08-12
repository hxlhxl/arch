
from stack import Stack

def par_match(open,close):
    _open = '([{'
    _close = ')]}'
    return _open.index(open) == _close.index(close)

def par_checker(string_expr):
    stk = Stack()
    index = 0
    balance = True
    while index < len(string_expr) and balance:
        symbol = string_expr[index]
        if symbol in '([{':
            stk.push(symbol)
        else:
            top = stk.pop()
            if par_match(top,symbol):
                pass
            else:
                balance = False
                break
        index += 1
    if balance and stk.is_empty():
        return True
    else:
        return False

if __name__ == '__main__':
    b = par_checker('(([{}]))')
    print(b)
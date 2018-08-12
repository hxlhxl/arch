a = [1,2,3]
b = ['a','b','c']
c = ['!','@','#','$']

z1 = zip(a,b)
z2 = zip(a,b,c)
z3 = zip(*zip(a,b,c))

for z in z1:
    print(z)

print('-' * 10)

for z in z2:
    print(z)
print('-' * 10)

for z in z3:
    print(z)

'''
(1, 'a')
(2, 'b')
(3, 'c')
----------
(1, 'a', '!')
(2, 'b', '@')
(3, 'c', '#')
----------
(1, 2, 3)
('a', 'b', 'c')
('!', '@', '#')

'''
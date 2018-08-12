def make_averager():
    total = 0
    count = 0
    def averager(num):
        # nonlocal total,count
        total += num
        count += 1
        avg = total * 1.0 / count
        # print avg
        return avg
    return averager
if __name__ == '__main__':
    avg = make_averager()
    avg(10)
    avg(11)
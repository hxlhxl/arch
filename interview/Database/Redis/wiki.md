# What 

Redis 是一个速度非常快的非关系型数据库，它可以存储键(key)与5种不同类型的值(value)之间的映射，可以将存储在内存的键值对数据持久化到硬盘，可以使用复制特性来扩展读性能，可以使用客户端分片来扩展写性能。

- 持久化
    Point-in-time
    append-only
- failover
    master-slave

## datastructure

- STRING【set、get、del】
    字符串、整数或者浮点数
        对整个字符串或者字符串中的一部分执行操作；对整数和浮点数执行自增或者自减

```

127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> get hello
"world"
# 返回成功删除的数量
127.0.0.1:6379> del hello
(integer) 1
127.0.0.1:6379> get hello
(nil)

```

- LIST 【lpush、rpush、lpop、rpop、lindex、lrange】
    有序，所有通过push方法。一个链表，链表上的每个节点都包含了一个字符串
        从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪；读取单个或者多个元素；根据值查找或者移除元素

```
127.0.0.1:6379> rpush list-key item
(integer) 1
127.0.0.1:6379> RPUSH list-key item2
(integer) 2
127.0.0.1:6379> rpush list-key item
(integer) 3
127.0.0.1:6379> lrange list-key 0 -1
1) "item"
2) "item2"
3) "item"
127.0.0.1:6379> lindex list-key 0
"item"
127.0.0.1:6379> rpop list-key
"item"
127.0.0.1:6379> lrange list-key 0 -1
1) "item"
2) "item2"
```


- SET 【sadd、smembers、sismember、srem、sinter交、sunion并、sdiff差】
    无序，所以通过add方法；包含字符串的无序集合unordered collection，并且被包含的每个字符串都是独一无二、各不相同的
        添加、获取、移除单个元素；检查一个元素是否存在于集合中；计算交集、并集、差集；从集合里随机获取元素

```
127.0.0.1:6379> sadd set-key item
(integer) 1
127.0.0.1:6379> TYPE set-key
set
127.0.0.1:6379> sadd set-key item2
(integer) 1
127.0.0.1:6379> sadd set-key item3
(integer) 1
127.0.0.1:6379> sadd set-key item
(integer) 0
# 下面的结果就可以看出是无序的方式，Python中会转换为set
127.0.0.1:6379> smembers set-key
1) "item2"
2) "item3"
3) "item"
127.0.0.1:6379> sismember set-key item2
(integer) 1
127.0.0.1:6379> sismember set-key item4
(integer) 0
127.0.0.1:6379> srem set-key item2
(integer) 1
127.0.0.1:6379> smembers set-key
1) "item3"
2) "item"
# 交差补
127.0.0.1:6379> sinter set-key set-key2
1) "item"
127.0.0.1:6379> sdiff set-key set-key2
1) "item3"
127.0.0.1:6379> sunion set-key set-key2
1) "item4"
2) "item"
3) "item3"
```

- HASH 【hset、hget、hgetall、hdel】
    微缩版的Redis，映射到Python里就是字典。hash键各不相同，且无序排列。包含键值对的无序散列。
        添加、获取、移除单个键值对；获取所有键值对

```
127.0.0.1:6379> hset hash-key sub-key1 value1
(integer) 1
127.0.0.1:6379> hset hash-key sub-key2 value2
(integer) 1
# 更新了键对应的值
127.0.0.1:6379> hset hash-key sub-key1 value3
(integer) 0

127.0.0.1:6379> hget hash-key sub-key1 
"value3"


127.0.0.1:6379> hgetall hash-key
1) "sub-key1"
2) "value3"
3) "sub-key2"
4) "value2"

127.0.0.1:6379> hdel hash-key sub-key1
(integer) 1
127.0.0.1:6379> hgetall hash-key
1) "sub-key2"
2) "value2"


```


- ZSET 【zadd、zrange、zrangebyscore、zrem】
    数据结构和散列类似不过又有SET的特征(所有用zadd这种)，但是有序集合的键被称为成员member、值为浮点数float分值score。member根据score排序。字符串成员(member)与浮点分数值(score)之间的有序映射，元素的排列顺序由分值的大小决定
        添加、获取、删除单个元素；根据分值范围(range)或者成员来获取元素

```
27.0.0.1:6379> zadd zset-key 728 member1
(integer) 1

127.0.0.1:6379> zadd zset-key 982 member0
(integer) 1
127.0.0.1:6379> zadd zset-key 982 mm
(integer) 1
127.0.0.1:6379> zrange zset-key 0 -1
1) "member1"
2) "member0"
3) "mm"
127.0.0.1:6379> zrange zset-key 0 -1 withscores
1) "member1"
2) "728"
3) "member0"
4) "982"
5) "mm"
6) "982"

127.0.0.1:6379> zrangebyscore zset-key 0 800 withscores
1) "member1"
2) "728"

127.0.0.1:6379> zrem zset-key mm 
(integer) 1

127.0.0.1:6379> zrange zset-key 0 -1 withscores
1) "member1"
2) "728"
3) "member0"
4) "982"

```




# How



## 全局唯一ID生成
[](https://www.cnblogs.com/haoxinyue/p/5208136.html)
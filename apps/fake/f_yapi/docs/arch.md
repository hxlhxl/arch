
# Architecture
yapi
    .connect: 一个MongoDB Mongoose实例,由`const mongoose = require('mongoose'); mongoose.connect`生成。
    .db: 一个函数，用于创建Model。函数中通过yapi.connect创建的连接(mongoose实例)，生成一个`compiled model`
    .getInst: 通过yapi.connect和yapi.db创建了一个Model，这个Model绑定在返回的实例的model上(this.model)

models/*
    base.js
        constructor
        isNeedAutoIncrement
        getPrimaryKey
        getSchema
        getName
    user.js
        getName
        getSchema
        save: 
          params
            - data: 要保存的数据
          func
            ```
              let user = new this.model(data);  // 实例化Model
              return user.save();
            ``` 
          return
            - «Promise,undefined» Returns undefined if used with callback or a Promise otherwise.
        checkRepeat
        list
        findByUids
        listWithPaging
        listCount
        findByEmail
        findById
        del
        update
        search


# install

1. 在user collection创建管理员账户
2. 在user collection的username、email(unique index) field设置index,参见MongoDB Driver API： http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#createIndex
3. 在创建索引的阶段，实际上就是已经成功连接，mongoose.connection.db.collection('user').createIndex({})，顺便会创建表(Collection)
4. 2,3两步会创建Collection和amdin账户，然后就退出了

# runtime
node server/app.js

1. 

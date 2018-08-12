# 职位

- boss招聘 国双科技 python开发工程师
- boss招聘 金蝶云之家 运维开发工程师
- boss招聘 腾讯音乐运营开发工程师
- boss招聘 ucloud 运维开发
- 拉钩 招银网络科技 运维工程师Windows？
- 拉钩 Face++ 高级运维开发工程师
- 拉钩 sensetine 全栈工程师？运维开发？
- 拉钩 小满科技 中级前端开发
- 拉钩 京东 运维工程师
- 拉钩 新华云帆 运维开发工程师
- 拉钩 sensetime web前端开发工程师
- ​

# 描述一下常见的选择器

元素选择器
id选择器
类选择器
伪类选择器
通配符选择器 *
属性选择器 div[class=avatar]

# 什么是WSGI？

wsgi全称web server gateway interface
分为wsgi server和wsgi application


# 什么是协程 coroutine

[ref](https://www.cnblogs.com/yjf512/p/5593181.html)

进程切换，PCB、TLB(ranslation Lookaside Buffer.快表，旁路转换缓冲)，寄存器，指令指针什么的。
线程的话就是之间共享线程共用代码资源，数据资源，内存资源了，只需要切换计数器，寄存器，变量，并不需要进行切换页表操作
    不管是线程还是进程，都存在用户态到内核态切换的调度过程，这个还是开销大。

协程：在用户态直接调度，不需要用户态和内核态切换的开销。当一个协程遇到IO的时候，会通过用户态的"调度协议"，让出CPU，另外的协程就会跟着执行了。

Python中实现协程的一个方案就是yield。而有yield的函数在调用之后就变成了生成器。



# 什么是生成器

()
yield

next(__next__)
send

# 什么是生成式

[]
()
{}

# Python设计模式

## 创建型
- 单例模式

```

```

## 结构型

## 行为型






# socket模型

client
    socket -> connect -> read/write -> close

server
    socket -> bind -> listen -> accept -> read/write -> close
# React生命周期

![react生命周期](https://raw.githubusercontent.com/bailicangdu/react-pxq/master/src/images/react-lifecycle.png)

# HTTP协议方法的区别

答案: 没区别
设计的初衷： 语义化，对应增删查改
本质： METHOD /url HTTP/1.1(version)

```
        headers
```

```
        本质都是明文
```
GET： 
  - url手动输入
  - url书签保存
  - url引擎收录
  - 等幂性，获取数据
  - 浏览器会对url长度作限制，协议本身并没有限制
  - 浏览器能够缓存GET请求

POST：
    - 修改数据，提交表单
    - POST请求浏览器不缓存，标准说可以缓存
    - 可以安全一点点，但是本质上都是明文，但是可以一定程度上防止csrf攻击。

 OPTION 

DELETE

PUT

# 常见HTTP code

1xx:
    100 Continue
    初始的请求已经接受，客户应当继续发送请求的其余部分
    101 Switching Protocols
    服务器将遵从客户的请求转换到另外一种协议
2xx:
    200   （成功）  服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
    201   （已创建）  请求成功并且服务器创建了新的资源。 
    202   （已接受）  服务器已接受请求，但尚未处理。 
    203   （非授权信息）  服务器已成功处理了请求，但返回的信息可能来自另一来源。 
    204   （无内容）  服务器成功处理了请求，但没有返回任何内容。 
    205   （重置内容） 服务器成功处理了请求，但没有返回任何内容。
    206   （部分内容）  服务器成功处理了部分 GET 请求。
3xx:
    300   （多种选择）  针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。 
    301   （永久移动）  请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
    302   （临时移动）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
    303   （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。
    304   （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
    305   （使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。 
    307   （临时重定向）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
4xx:
    400   （错误请求） 服务器不理解请求的语法。 
    401   （Not Authorized 未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。 
    403   （Forbidden 禁止） 服务器拒绝请求。
    404   （Not Found 未找到） 服务器找不到请求的网页。
    405   （Method Not Allowed 方法禁用） 禁用请求中指定的方法。 
    406   （不接受） 无法使用请求的内容特性响应请求的网页。 
    407   （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
    408   （请求超时）  服务器等候请求时发生超时。 
    409   （冲突）  服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。 
    410   （已删除）  如果请求的资源已永久删除，服务器就会返回此响应。 
    411   （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。 
    412   （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。 
    413   （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。 
    414   （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。 
    415   （不支持的媒体类型） 请求的格式不受请求页面的支持。 
    416   （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。 
    417   （未满足期望值） 服务器未满足"期望"请求标头字段的要求。
5xx:
    500   （Internel Server Error 服务器内部错误）  服务器遇到错误，无法完成请求。 
    501   （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。 
    502   （Bad Gateway 错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。 服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答
    503   （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。 
    504   （Gateway Timeout网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求。 
    505   （HTTP Version Not Supported HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。


# rpmbuild
分为几个指令、步骤：
%description
%pre
%build
    BUILDROOT BUILD SRPMS SPEC
%clean
%files
%changelog


# Python GIL的理解

Python的线程是真正的线程，但是CPython解释器上有一个GIL(Global Interpreter Lock)，任何Python线程执行前，必须获得这个mutex lock；在IO或者执行一定字节代码后，解释器会自动释放mutex lock，让别的线程有机会执行。这也就意味着，在多线程中，实际上也只有一个线程在执行。这和其他语言中的多线程存在非常巨大的差异。


# 说一说知道的开源软件

docker kvm
haproxy squid
lvs keepalive ...
nginx apache tomcat netty
ansible puppet
elk



# 说一说你做的OA这个东西。

妙计办公
    公司制度
    上传下载
    员工管理
        权限管理
    文案管理

自助服务
    工单系统
        自主上线
            模块+数据库
                module env tag cfg loop
                    cfg与环境无关，在上线之前会替换通用变量。{OP-online-Redis}
            配置管理
            双环上线

    POI
    故障处理
    模块信息查询

logQuery
    logtree
    superqid
    logsearch： env qid logtype datedur email account uid等
        filebeat    redis   python  mysql
        QPS/TPS: query/transaction per second

运维工具
    定时任务
    资产统计
    内网域名
    Nginx管理
    报警邮件
    短信服务

其他入口
    监控
    绿皮

        
# redis数据结构及操作方法

- 字符串
    set get
- 队列
    lpush lpop
    rpush rpop
    lrange list-key 0 -1
    lindex list-key 
- 集合
    sadd
    srem
    smembers set-key
    sismember set-key item

- hash
    hset
    hget hash-key key
    hgetall hash-key
    hdel hash-key
- order hash 有序集合
    zadd zset-key score member
    zrange zset-key 0 -1 withscores
    zrangebyscore zset-key 0 800 withscores
    zrem zset-key member


# 说一说logquery整体设计

前提：
## 日志格式

- RequestClient MJOPObserver
- ResponseClient MJOPObserver
- RequestServer MJOPObserver
- ResponseServer MJOPObserver




## filebeat

- 日志大致都在统一的位置，且按分钟切割 /search/service/nginx/html/chat-api/storage/op_logs/*/*/*
- 日志正则字段 "MJOPObserver","MiojiOPObserver"
- 压缩日志不匹配
- document_type用于区别不同的日志： php_log,nginx_log
- scan_frequency:
- backoff: 1s Backoff defines how long it is waited to check a file again after EOF is reached.
- output: redis,默认datatype是list，使用RPUSH推送数据。 redis key: pushdata_env/nginx_env/... 

## 绝影

python bin/logBeat.py -c  (nginx)
python bin/logbeat_pushdata.py -c (pushdata)

流程：
    1. 根据nginx还是pushdata从而进程到不同的redis队列中获取日志
    2. while True循环，有就处理，没有就sleep continue
    3. json.loads(raw_json)
    4.




## 数据库搜索流程

- 建表流程
- 转移日志流程
- 


## apiProber

一组探针每个type之间通过sleepN控制
一组探针的频率通过末尾的N_min控制
发送请求会记录cost和http_code，非200会报警
data中看需不需要，检查异步日志，请求之后，回去查找logquery中的异步日志，看error_id 这些是否正常
data中看不不需要检查结果长度
data中看不需要检查返回制定结果。


```
while ((1));do
	for seed in `seq 0 59`;do
		log_tag=`date +"%Y%m%d-%H-%M-%S"`
		./send_monitor.py ${seed} >> log/${log_tag}.log 2>>log/${log_tag}.err &
        # 表示没分钟执行一次，根据分钟是否被N_min整除判断是否执行。
		sleep 60
	done
done 


```



- data
里面会存在 fail_exit字段，表示如果失败（在error_id非0的情况下），则退出。
```
data = {
    #登录
    'usv110':{
        'base_query':'{"account":"OPMON_GET(init,account)_OPMON","password":"Tanzhen2017","ptName":"miojitanzhen"}',
        'uri':'/op/user',
        'min_len':200,
    },
    #获取行程列表
    'usv113':{
        'base_query':'{}',
        'uri':'/op/user',
        'min_len':90,
    },
}
```

- send_order

```
[
    [
        ['cdn_uc',],
        ['cdn_ks',],
        ['b.mioji.com',],
        # 登录,新建,拉取,填写信息,规划,拉取
        ['dsv013_add', 'dsv012', 'dsv013_del0', 'dsv013_del1','usv110','usv113','usv114', 'sleep2','usv104', 'csv001', 'csv110', 'csv111', 'csv112', 'csv103','sleep5', 'csv108','sleep5','usv104_new'],
    ],
    [
        ['gsv103','gsv101','gsv102_hotel','gsv102_scity','gsv105','psv102','psv103','ssv105','rbsv001','tsv105','tsv106'],
        #['gsv103','gsv101','gsv102_hotel','gsv102_scity','gsv105','psv102','psv103','ssv105','rbsv001'],
        ['hsv104','hsv102','rbsv005','bsv101','bsv104_contact','bsv104_traveller','dsv001','bsv110', 'bsv111','sleep1','bsv113','bsv103', '5_min'],
        ['usv116','15_min'],

    ],
    [
        #重置行程, 删除行程
        ['usv107', 'usv114_del'],
    ]
]

```

- for req_list in send_order:
    c_monitor.set_reqlist(req_list)
    c_monitor.send_all_monitor()

- send_all_monitor
    for monitor in self.monitor_list:
        #发送控制开关
        if self.fatal_exit:
                continue
        if 'min' in monitor[-1]:
            interval = monitor[-1].split('_')[0]
            # 如果刚好为时间间隔，则发送探针
            if self.seed % int(interval) == 0:
                self.send_monitor(monitor[:-1])
        else:
            self.send_monitor(monitor)

- send_monitor

```
     for req in req_list:
        if self.fatal_exit:
            continue
        print '--------'
        res = {}
        begin_stamp = time.time()
        qid = int(begin_stamp*1000)
        res['monitor'] = [req]
        res['begin'] = begin_stamp
        res['req'] = req
        res['QID'] = qid
        
        if req[:5] == 'sleep':
            print '[sleep]{0}'.format(req_list)
            time.sleep(int(req[5:]))
            continue
        #发送状态相关参数，req:status 1:正在发送 2:请求成功3:请求失败
        if req in self.send_rec:
            #if self.send_rec[req] == 3:
            #    break
            print "[send]{1}found {0}".format(req,req_list)
        else:
            print '[send]{1}send {0}'.format(req,req_list)
            self.send_rec[req] = 1
            send_res = self.send_req(req,qid)
            res.update(send_res)
            end_stamp = time.time()
            res['end'] = end_stamp
            if 'cost' not in res:
                cost = end_stamp - begin_stamp
                res['cost'] = cost
            self.check_res(res)
            if res['error_id'] != 0:
                self.send_rec[req] = 3
                if data[req].get('fail_exit',True):
                    self.fatal_exit = True
                #break
            self.send_rec[req] = 2
    print "[done]{0}".format(req_list)

```

- send_req

```
    def send_req(self,req,qid):
        '''
        发送某一个请求
        返回{error_id:error_str}
        '''
        res = {'error_id':0,'error_str':''}
        #base_data预处理
        base_data = self.base_data.copy()
        base_data['ver'] = data[req].get('ver','')
        self.format_base(base_data)

        #base_query预处理
        try:
            base_query = data[req]['base_query']
            base_query = self.format_query(base_query)
        except Exception as e:
            res['error_id'] = 1
            res['error_str'] = u'无法构造请求，{0}'.format(str(e))
            return res

        #组合base_data和base_query
        req_type = req.rsplit('_',1)[0]
        base_data['query'] = base_query
        base_data['type'] = req_type
        base_data['qid'] = qid


        #发送请求
        try:
            begin_send_stamp = time.time()
            # 调用requests发送请求数据。
            api_ret = self._conn(base_data,req)
            end_send_stamp = time.time()
            if self.debug:
                print '[debug]{0}请求发送完成'.format(req)
            res['HTTP_CODE'] = api_ret.status_code
            timeout_limit = data.get(req).get('timeout',180000)
            res['cost'] = end_send_stamp - begin_send_stamp
            send_cost = res['cost']*1000
            if send_cost > timeout_limit:
                res['error_id'] = 8
                res['error_str'] = u'请求时间过长，耗时{0}ms'.format(send_cost)
                return res

            if api_ret.status_code != 200:
                res['error_id'] = 2
                res['error_str'] = u'http_code返回{0}'.format(api_ret.status_code)
                return res
        except Exception as e:
            res['error_id'] = 3
            res['error_str'] = u'请求发送异常，异常信息{0}'.format(str(e))
            return res


        #判断是否需要检查结果
        if data.get(req).get('check_result',True) == False:
            return res
 

        #从logquery检查异步日志
        try:
            check_type = ""
            for check_rule in data[req].get('check_type',[]):
                check_type = check_rule[0]
                log_type = check_rule[1]
                try_sum = check_rule[2]
                self.check_from_log_query(qid,req,check_type,log_type,try_sum)
        except Exception as e:
            traceback.print_exc()  
            fail_owner = self.get_desp(check_type,'owner')
            dev_owner = self.get_desp(check_type,'dev_owner')
            if fail_owner != "" or dev_owner != "":
                res['fail_owner'] = "{0};{1}".format(fail_owner,dev_owner)
            res['error_id'] = 10
            res['error_str'] = u'后续请求失败,{0}'.format(str(e))
            return res


        #检查返回error_id
        if self.debug:
            print '[debug]开始检查{0}的error_id'.format(req)
            #print '[response][{0}]{1}'.format(req,api_ret.text)
        try:
            ret_dict = json.loads(api_ret.text)
            error_id = ret_dict['error']['error_id']
            res['ERROR_ID'] = error_id
            if str(error_id) != "0":
                res['error_id'] = 5
                res['fail_owner'] = self.get_error_id_owner(error_id)
                res['error_str'] = u'请求返回error id为{0}'.format(error_id)
                return res
        except Exception as e:
            res['error_id'] = 6
            res['error_str'] = u'请求解析异常，异常信息{0}'.format(str(e))
            return res


        #检查返回长度
        ret_len = len(api_ret.text)
        if ret_len < int(data.get(req,{}).get('min_len',20000)):
            res['error_id'] = 4
            res['response'] = api_ret.text
            res['error_str'] = u'返回过短,返回长度为{0}'.format(ret_len)
            return res


        #自定义检查返回结果
        check_res_list = data.get(req).get('check_result',[])
        for check_item in check_res_list:
            posi = check_item[0]
            min_len = check_item[1]
            expect_type = check_item[2]
            pos_list = posi.split('-')
            need_v = ret_dict

            try:
                for pos in pos_list:
                    if pos[0] == '[' or pos[-1] == ']':
                        need_v = need_v[int(pos[1:-1])]
                    else:
                        need_v = need_v[pos]
            except Exception as e:
                res['error_id'] = 7
                res['error_str'] = u'返回解析错误,无法解析{0},{1}'.format(posi,str(e))
                return res
            
            if not isinstance(need_v,expect_type):
                res['error_id'] = 20
                res['error_str'] = u'返回类型错误,错误位置{0},返回类型为{1},应为'.format(posi,type(need_v),expect_type)
                return res
                


        #取得返回中需要的数据
        out_data = data[req]['out_data']
        for common_key in out_data:
            pos_in_ret = out_data[common_key]
            pos_list = pos_in_ret.split('-')
            need_v = ret_dict
            try:
                for pos in pos_list:
                    if pos[0] == '[' or pos[-1] == ']':
                        pos_value = pos[1:-1]
                        if pos_value == 'random':
                            pos_int = random.randint(0,len(need_v)-1)
                        else:
                            pos_int = int(pos_value)
                        need_v = need_v[pos_int]
                    else:
                        need_v = need_v[pos]
            except Exception as e:
                res['error_id'] = 7
                res['error_str'] = u'返回解析错误,无法解析{0},{1}'.format(pos_in_ret,str(e))
                return res
            self.common_data[common_key] = need_v

        return res


```


- check_from_log_query

```



```





# 说一说机器初始化

- DNS
- YUM repo
- Host Name
- Zabbix|Grafana
- srv owner hostname path ... 入库
- lib software
- 

# 说一说爬虫体系

pyenv python 2.7.12
    spider用户执行
    ansible playbook ? 并没有使用。
        扫描端口的时候使用过.

中控统一脚本
    遍历所有的东西
    sh spider.sh env type 
        还有一些自定义的东西，比如磁盘位置(log location),机器配置(进程多少)，代理(是否使用代理)，比较非常麻烦。

# 说一说optool工具的设计

用法： optool [-h] -t action -m module -e environment [ -v version ]
where:
|       -h  show help message
|       -t  需要的操作(restart | deploy)
|       -m  操作的模块,可以多个(sql将进行数据库更新重启流程)
|       -v  上线的版本(deploy需要)
|       -e  环境(online|test)"

```
query(){
|       sql=$1
|       mysql -uroot -h10.10.144.181 -pmiojiqiangmima -D modinfo --skip-column-names -e "${sql}"
}
get_rpm(){
    modu=$1
    version=$2
    rsync builder.uc.op::rpms/${modu}* | grep ${version} | grep -v debuginfo | awk '{print $NF}'
}
read_input(){
    hint=$1
    read -n1 -p "${hint}" ans
    case $ans in
        Y|y)
        ¦   echo "开始......"
        ¦   ;;
        *)
        ¦   echo "退出!!!"
        ¦   exit
        ¦   ;;
    esac
}

next=$1


echo "请用中控的脚本"
exit 1


while [ "${next}" != "" ]; do
|       param=${next}
|       case ${param} in
|       |       -h)
|       |       |       echo "$usage"
|       |       |       exit
|       |       |       ;;
|       |       -m)
|       |       |       shift
|       |       |       value=$1
|       |       |       while [ "${value:0:1}" != "-" -a "${value}" != "" ]; do
|       |       |       |       modules=${modules}" "${value}
|       |       |       |       shift
|       |       |       |       value=$1
|       |       |       done
|       |       |       next=${value}
|       |       |       continue
|       |       |       ;;
|       |       -t)
|       |       |       shift
|       |       |       action=$1
|       |       |       ;;
|       |       -v)
|       |       |       shift
|       |       |       version=$1
|       |       |       ;;
|       |       -e)
|       |       |       shift
|       |       |       envir=$1
|       |       |       ;;
|       |       *)
|       |       |       echo "ERROR: unknown parameter \"$param\""
|       |       |       echo "$usage"
|       |       |       exit
|       |       |       ;;
|       esac
|       shift
|       next=$1
done



deploy(){
|       version=$1
|       echo "开始进行${envir}环境的上线"
|       for modu in ${modules}; do
        rpm=`get_rpm ${modu} ${version}`
        if [ "${rpm}" == "" ]; then
        ¦   echo "没有找到${modu}的${version}版本的包,退出!!!"
        ¦   exit 1
        fi
        #echo ${rpm}
        read_input "是否上线${rpm}[Y/N]?"
        rsync builder.uc.op::rpms/${rpm} /search/zhaojiajin/restart_modu/rpm/
|       |       for id in `query "select id from BASE_Hosts where modu='${modu}' and env='${envir}'"`;do
|       ¦       ip=`query "select ip from BASE_Hosts where id=${id}"`|  
|       ¦       monitor_word=`query "select monitor_word from BASE_Hosts where id=${id}"`
|       ¦       path=`query "select path from BASE_Hosts where id=${id}"`
        ¦   echo -n "开始上线"
        ¦   mioji-host -i $ip
        ¦   rsync -a /search/zhaojiajin/restart_modu/rpm/${rpm} ${ip}:${path}/
        ¦   if [ $? -ne 0 ]; then
        ¦       echo "传包失败.退出!!!"
        ¦       exit 1
        ¦   fi
        ¦   ts=`date +%s%N`
        ¦   tid=${ts:0:13}
        ¦   cmd="cd ${path}; sh new-deploy.sh -d ${rpm} -t ${tid}"
        ¦   ssh ${ip} "${cmd}"
        ¦   #return_code=$?
        ¦   #echo ${return_code}
        ¦   #更改判断方式, 改用数据库记录判断
        ¦   res_code=`query "select result from UPGRADE_log where ip='${ip}' and modu='${modu}' and env='${envir}' and id='${tid}' and reason=${reason} order by id desc limit 1"`
        ¦   if [ ${res_code} -ne 1 ];then
        ¦       echo "上线失败,请检查,开始回滚!!! 通知赵家进"
        ¦       roll_back $ip $path $modu $version
        ¦   fi
        done
|       done
|       
}


case ${action} in
|       restart)
        if [ "${modules}" == " sql" ];then
        ¦   reason=4
        ¦   restart_sql
        else
        ¦   reason=3
        ¦   restart_modu
        fi
|       |       exit
|       |       ;;
|       deploy)
        reason=2
|       |       deploy ${version}
|       |       exit
|       |       ;;
|       *)
|       |       echo "$usage"
|       |       exit
|       |       ;;
esac

```

# 说一说你是怎么使用ansible的

- ad-hoc
- 端口扫描的时候用过

# MySQL相关

## replace into

## create index

```
CREATE INDEX index_name ON TABLE_NAME (col_name)
```

# 前端优化方案

# Xwiki、Gitlab
## 搭建

## 备份
xwiki -> mysqldump
gitlab -> 
    sudo gitlab-rake gitlab:backup:create
    sudo -u git -H bundle exec rake gitlab:backup:create RAILS_ENV=production

上传至ucloud的ufile

# 如何理解DevOps

DevOps是一种开发理念，和传统交付有一定的区别。
运维在DevOps下，扮演着很重要的角色。DevOps需要参与了解产品的功能、使用、常见测试用例；也要了解如何build、deploy、monitor。而且以上过程大部分工具，也基本由DevOps维护。
所以DevOps需要关注最基本的两个点：效率+稳定，兼顾日常开发和运维。

![如何构建DevOps平台](http://mmbiz.qpic.cn/mmbiz_png/tzia4bcY5HEL8R2Jtw9aq7GpB5nEf9GGXnf60NkTapN7OOfAx4iayT14Zg4pGfkYbWOVibWMqwX0SWcq2wvdicF6Kg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)


# 布局方案




# promise原理



## 双飞燕

## 圣杯布局

## 两栏布局

# JavaScript事件模型


# CronServer


# 设计模式

## 创建型

## 结构型

## 行为型



# 算法
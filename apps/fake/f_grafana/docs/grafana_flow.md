
// import pkg/api 
init()  // pkg/api.http_server.go
    registry.Register(&registry.Descriptor{ // 向registry.services数组添加instance实例
            Name:			"HTTPServer",
            Instance:		&HTTPServer{},  // type Service interface {Init()}; 所有服务实例都实现了Init方法
            InitPriority:	registry.High,
        })

server.Run()
    g.loadConfiguration()
    g.writePIDFile()
    services := registry.GetServices()  // 按照service优先级排序返回registry.services
    service.Init()                      // 遍历registry.services并调用Init()方法
    service, ok := srv.Instance.(registry.BackgroundService)
    service.Run()                       // 如果service实现了BackgroundService(定义了Run接口方法)就在一个errgroup中调用Run()方法
        service.http_server
            Init()
                hs.registerRoutes()         

            Run()


# macaron flow
https://go-macaron.com/docs/intro/core_concepts#macaron-实例


# 常见问题

1. 在什么地方往前端js注入了配置数据？
   /pkg/api/index.go中的setIndexViewData
2. 
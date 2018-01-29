1. 怎样实现防盗链
ref: https://www.alibabacloud.com/help/zh/doc-detail/31937.htm
- referer
  其他网站会带上referer字段，为空或者为盗链网站域名
- 签名URL
  对资源做签名，只有带有Authorized HTTP头的才能访问

2. 怎样屏蔽爬虫
ref: https://www.zhihu.com/question/28168585
- IP封禁
  - 获取爬虫的规律
    时间(每隔1小时，3小时)，日志查找某时间段最多的，UserAgent，IP反查是不是搜索引擎的等
- JS执行
- 加密

3. 怎样防止注入

4. Web服务器安全配置
- web服务执行用户权限
- 禁止列出目录
- 隐藏版本信息
- 自定义错误页面，删除默认文件
- HTTPS
- Referer检测
- 防止CSRF，签名

5. 防止文件篡改

6. 





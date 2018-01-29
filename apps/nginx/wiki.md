
# location

# rewrite

# proxy_pass
官方文档描述：
一个客户端请求URI(normalized URI)
如果proxy_pass后被/开头，那么location匹配的normailized URI会被location截断，并添加到proxy_pass后面去。
如果proxy_pass后么有/开头，那么location匹配的normalized URI会被完整添加到proxy_pass后面去。

```
location /foo {
    proxy_pass http://localhost:3001/;
}
在proxy_pass末尾添加'/'导致客户端访问 /foo/bar的时候，会转发为 http://localhost:3001/bar
```

```
location /foo {
    proxy_pass http://localhost:3001;
}
客户端访问/foo时，会转发微http://localhost:3001/foo
```




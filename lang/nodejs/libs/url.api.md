https://github.com/defunctzombie/node-url#readme


'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

href: The full URL that was originally parsed
    'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

protocol: The request protocol
    'http'

host: The full lowercased host portion of the URL, including port information
    'host.com:8080'

auth: The authentication information
    'user:pass'

hostname: 
    'host.com'

port:
    8080

pathname:
    '/p/a/t/h'

search:
    '?query=string'

path: pathname + search
    '/p/a/t/h?query=string'

query: `param` or parsed object
    'query=string' or {'query': 'string'}

hash:
    '#hash'





# API

- url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
Take a URL string, and return an object.

Pass true as the second argument to also parse the query string using the querystring module. Defaults to false.

Pass true as the third argument to treat //foo/bar as { host: 'foo', pathname: '/bar' } rather than { pathname: '//foo/bar' }. Defaults to false.


```
> url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash', true)
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: [Object: null prototype] { query: 'string' },
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
> url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash', false)
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
```


- url.format(urlObj)
- url.resolve(from, to)
组装url，本质是先`parse(from)`，然后`parse(from).resolve(to)`，下面的例子便于理解起作用。

```
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('/one/two/three', '/four')         // '/four'
url.resolve('/one/two/three', '#four')         // '/one/two/three#four'
url.resolve('/one/two/three', '?four=1234#five')    // '/one/two/three?four=1234#five'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one/two/three', '/four') // 'http://example.com/four'
```
pacman -S go
vim ~/.bashrc

go get -v github.com/grafana/grafana

// server
cd ~/go/src/github.com/grafana/grafana
go run build.go setup
go run build.go build

// client
npm install yarn -g
cd ~/go/src/github.com/grafana/grafana
yarn

// start
cd ~/go/src/github.com/grafana/grafana
npm run watch
./bin/linux-amd64/grafana-server --config conf/defaults.ini

// browse
// http://192.168.145.132:3000  admin/admin




// dependencies

[root@osboxes grafana]# go run build.go  setup
GOPATH is /root/go
Version: 5.3.0-pre1, Linux Version: 5.3.0, Package Iteration: 1534098243pre1
go get -v github.com/golang/dep
github.com/golang/dep (download)
github.com/golang/dep/vendor/github.com/Masterminds/semver
github.com/golang/dep/vendor/github.com/Masterminds/vcs
github.com/golang/dep/vendor/github.com/armon/go-radix
github.com/golang/dep/vendor/github.com/boltdb/bolt
github.com/golang/dep/vendor/github.com/golang/protobuf/proto
github.com/golang/dep/gps/paths
github.com/golang/dep/gps/pkgtree
github.com/golang/dep/vendor/github.com/pkg/errors
github.com/golang/dep/internal/fs
github.com/golang/dep/vendor/github.com/jmank88/nuts
github.com/golang/dep/vendor/github.com/nightlyone/lockfile
github.com/golang/dep/vendor/github.com/sdboyer/constext
github.com/golang/dep/vendor/golang.org/x/net/context
github.com/golang/dep/vendor/golang.org/x/sync/errgroup
github.com/golang/dep/vendor/github.com/pelletier/go-toml
github.com/golang/dep/gps/internal/pb
github.com/golang/dep/gps
github.com/golang/dep/gps/verify
github.com/golang/dep
go install -v ./pkg/cmd/grafana-server
github.com/grafana/grafana/vendor/github.com/facebookgo/structtag
github.com/grafana/grafana/vendor/github.com/facebookgo/inject
github.com/grafana/grafana/vendor/github.com/Unknwon/com
github.com/grafana/grafana/vendor/github.com/go-macaron/inject
github.com/grafana/grafana/vendor/golang.org/x/crypto/pbkdf2
github.com/grafana/grafana/vendor/gopkg.in/ini.v1
github.com/grafana/grafana/vendor/github.com/go-stack/stack
github.com/grafana/grafana/vendor/github.com/teris-io/shortid
github.com/grafana/grafana/pkg/util
github.com/grafana/grafana/vendor/gopkg.in/macaron.v1
github.com/grafana/grafana/vendor/github.com/mattn/go-isatty
github.com/grafana/grafana/vendor/github.com/mattn/go-colorable
github.com/grafana/grafana/vendor/github.com/inconshreveable/log15
github.com/grafana/grafana/pkg/log
github.com/grafana/grafana/vendor/github.com/patrickmn/go-cache
github.com/grafana/grafana/pkg/components/null
github.com/grafana/grafana/vendor/github.com/go-macaron/binding
github.com/grafana/grafana/vendor/github.com/go-macaron/session
github.com/grafana/grafana/pkg/components/simplejson
github.com/grafana/grafana/pkg/setting
github.com/grafana/grafana/vendor/github.com/rainycape/unidecode
github.com/grafana/grafana/vendor/github.com/gosimple/slug
github.com/grafana/grafana/vendor/github.com/bradfitz/gomemcache/memcache
github.com/grafana/grafana/pkg/api/avatar
github.com/grafana/grafana/pkg/components/securejsondata
github.com/grafana/grafana/vendor/github.com/go-macaron/session/memcache
github.com/grafana/grafana/vendor/github.com/lib/pq/oid
github.com/grafana/grafana/vendor/gopkg.in/bufio.v1
github.com/grafana/grafana/vendor/github.com/lib/pq
github.com/grafana/grafana/vendor/gopkg.in/redis.v2
github.com/grafana/grafana/vendor/github.com/go-macaron/session/postgres
github.com/grafana/grafana/vendor/github.com/go-sql-driver/mysql
github.com/grafana/grafana/vendor/github.com/go-macaron/session/redis
github.com/grafana/grafana/vendor/github.com/beorn7/perks/quantile
github.com/grafana/grafana/vendor/github.com/golang/protobuf/proto
github.com/grafana/grafana/pkg/services/session
github.com/grafana/grafana/vendor/github.com/prometheus/common/internal/bitbucket.org/ww/goautoneg
github.com/grafana/grafana/vendor/github.com/prometheus/common/model
github.com/grafana/grafana/vendor/github.com/prometheus/procfs/internal/util
github.com/grafana/grafana/vendor/github.com/prometheus/procfs/nfs
github.com/grafana/grafana/vendor/github.com/prometheus/procfs/xfs
github.com/grafana/grafana/vendor/github.com/prometheus/procfs
github.com/grafana/grafana/vendor/github.com/prometheus/client_model/go
github.com/grafana/grafana/vendor/github.com/matttproud/golang_protobuf_extensions/pbutil
github.com/grafana/grafana/vendor/github.com/prometheus/common/expfmt
github.com/grafana/grafana/vendor/github.com/hashicorp/go-hclog
github.com/grafana/grafana/vendor/github.com/hashicorp/yamux
github.com/grafana/grafana/vendor/github.com/prometheus/client_golang/prometheus
github.com/grafana/grafana/vendor/github.com/mitchellh/go-testing-interface
github.com/grafana/grafana/vendor/github.com/oklog/run
github.com/grafana/grafana/vendor/golang.org/x/net/context
github.com/grafana/grafana/vendor/golang.org/x/text/transform
github.com/grafana/grafana/vendor/golang.org/x/text/unicode/bidi
github.com/grafana/grafana/vendor/golang.org/x/text/secure/bidirule
github.com/grafana/grafana/vendor/golang.org/x/text/unicode/norm
github.com/grafana/grafana/pkg/models
github.com/grafana/grafana/vendor/golang.org/x/net/idna
github.com/grafana/grafana/vendor/golang.org/x/net/http/httpguts
github.com/grafana/grafana/vendor/golang.org/x/net/http2/hpack
github.com/grafana/grafana/vendor/golang.org/x/net/internal/timeseries
github.com/grafana/grafana/vendor/golang.org/x/net/http2
github.com/grafana/grafana/vendor/golang.org/x/net/trace
github.com/grafana/grafana/vendor/google.golang.org/grpc/grpclog
github.com/grafana/grafana/vendor/google.golang.org/grpc/connectivity
github.com/grafana/grafana/vendor/google.golang.org/grpc/credentials
github.com/grafana/grafana/vendor/google.golang.org/grpc/resolver
github.com/grafana/grafana/vendor/google.golang.org/grpc/balancer
github.com/grafana/grafana/vendor/google.golang.org/grpc/balancer/base
github.com/grafana/grafana/vendor/google.golang.org/grpc/balancer/roundrobin
github.com/grafana/grafana/vendor/google.golang.org/grpc/codes
github.com/grafana/grafana/vendor/google.golang.org/grpc/encoding
github.com/grafana/grafana/vendor/google.golang.org/grpc/encoding/proto
github.com/grafana/grafana/vendor/google.golang.org/grpc/grpclb/grpc_lb_v1/messages
github.com/grafana/grafana/vendor/google.golang.org/grpc/internal
github.com/grafana/grafana/vendor/google.golang.org/grpc/keepalive
github.com/grafana/grafana/vendor/google.golang.org/grpc/metadata
github.com/grafana/grafana/vendor/google.golang.org/grpc/naming
github.com/grafana/grafana/vendor/google.golang.org/grpc/peer
github.com/grafana/grafana/vendor/google.golang.org/grpc/resolver/dns
github.com/grafana/grafana/vendor/google.golang.org/grpc/resolver/passthrough
github.com/grafana/grafana/vendor/google.golang.org/grpc/stats
github.com/grafana/grafana/vendor/github.com/golang/protobuf/ptypes/any
github.com/grafana/grafana/vendor/github.com/golang/protobuf/ptypes/duration
github.com/grafana/grafana/vendor/github.com/golang/protobuf/ptypes/timestamp
github.com/grafana/grafana/vendor/google.golang.org/genproto/googleapis/rpc/status
github.com/grafana/grafana/vendor/github.com/golang/protobuf/ptypes
github.com/grafana/grafana/vendor/google.golang.org/grpc/tap
github.com/grafana/grafana/pkg/bus
github.com/grafana/grafana/vendor/google.golang.org/grpc/status
github.com/grafana/grafana/vendor/github.com/go-xorm/core
github.com/grafana/grafana/vendor/google.golang.org/grpc/transport
github.com/grafana/grafana/vendor/github.com/go-xorm/builder
github.com/grafana/grafana/vendor/google.golang.org/grpc
github.com/grafana/grafana/vendor/github.com/go-xorm/xorm
github.com/grafana/grafana/vendor/google.golang.org/grpc/health/grpc_health_v1
github.com/grafana/grafana/vendor/google.golang.org/grpc/health
github.com/grafana/grafana/vendor/github.com/hashicorp/go-plugin
github.com/grafana/grafana/vendor/github.com/grafana/grafana-plugin-model/go/datasource
github.com/grafana/grafana/vendor/github.com/mattn/go-sqlite3
github.com/grafana/grafana/pkg/tsdb
github.com/grafana/grafana/pkg/plugins/datasource/wrapper
github.com/grafana/grafana/pkg/services/guardian
github.com/grafana/grafana/vendor/github.com/hashicorp/go-version
github.com/grafana/grafana/vendor/github.com/gorilla/websocket
github.com/grafana/grafana/vendor/github.com/opentracing/opentracing-go/log
github.com/grafana/grafana/vendor/github.com/opentracing/opentracing-go
github.com/grafana/grafana/pkg/api/routing
github.com/grafana/grafana/pkg/api/static
github.com/grafana/grafana/pkg/components/apikeygen
github.com/grafana/grafana/vendor/github.com/sergi/go-diff/diffmatchpatch
github.com/grafana/grafana/vendor/github.com/yudai/golcs
github.com/grafana/grafana/vendor/github.com/yudai/gojsondiff
github.com/grafana/grafana/vendor/github.com/yudai/gojsondiff/formatter
github.com/grafana/grafana/pkg/components/dashdiffs
github.com/grafana/grafana/pkg/events
github.com/grafana/grafana/vendor/github.com/BurntSushi/toml
github.com/grafana/grafana/vendor/github.com/davecgh/go-spew/spew
github.com/grafana/grafana/vendor/gopkg.in/asn1-ber.v1
github.com/grafana/grafana/vendor/github.com/go-ldap/ldap
github.com/grafana/grafana/pkg/services/quota
github.com/grafana/grafana/pkg/login
github.com/grafana/grafana/pkg/metrics/graphitebridge
github.com/grafana/grafana/vendor/github.com/klauspost/cpuid
github.com/grafana/grafana/vendor/github.com/klauspost/compress/flate
github.com/grafana/grafana/vendor/github.com/klauspost/crc32
github.com/grafana/grafana/vendor/github.com/klauspost/compress/gzip
github.com/grafana/grafana/vendor/github.com/go-macaron/gzip
github.com/grafana/grafana/vendor/github.com/opentracing/opentracing-go/ext
github.com/grafana/grafana/vendor/github.com/benbjohnson/clock
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/awserr
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/internal/shareddefaults
github.com/grafana/grafana/vendor/github.com/go-ini/ini
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/credentials
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/endpoints
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/internal/sdkio
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/client/metadata
github.com/grafana/grafana/vendor/github.com/jmespath/go-jmespath
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/awsutil
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/request
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/internal/sdkrand
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/client
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/corehandlers
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/ec2metadata
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/credentials/ec2rolecreds
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/rest
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/signer/v4
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/query/queryutil
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/xml/xmlutil
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/query
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/service/sts
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/credentials/stscreds
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/csm
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/credentials/endpointcreds
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/defaults
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/aws/session
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/eventstream
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/eventstream/eventstreamapi
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/restxml
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/service/s3
github.com/grafana/grafana/vendor/golang.org/x/net/context/ctxhttp
github.com/grafana/grafana/vendor/cloud.google.com/go/compute/metadata
github.com/grafana/grafana/vendor/golang.org/x/oauth2/internal
github.com/grafana/grafana/vendor/golang.org/x/oauth2
github.com/grafana/grafana/vendor/golang.org/x/oauth2/jws
github.com/grafana/grafana/vendor/golang.org/x/oauth2/jwt
github.com/grafana/grafana/vendor/golang.org/x/oauth2/google
github.com/grafana/grafana/pkg/components/imguploader
github.com/grafana/grafana/pkg/services/annotations
github.com/grafana/grafana/vendor/github.com/grafana/grafana-plugin-model/go/renderer
github.com/grafana/grafana/vendor/golang.org/x/sync/errgroup
github.com/grafana/grafana/pkg/social
github.com/grafana/grafana/pkg/tsdb/testdata
github.com/grafana/grafana/vendor/github.com/prometheus/client_golang/prometheus/promhttp
github.com/grafana/grafana/pkg/extensions
github.com/grafana/grafana/vendor/gopkg.in/mail.v2
github.com/grafana/grafana/vendor/gopkg.in/yaml.v2
github.com/grafana/grafana/pkg/services/provisioning/datasources
github.com/grafana/grafana/pkg/services/sqlstore/sqlutil
github.com/grafana/grafana/vendor/github.com/denisenkom/go-mssqldb/internal/cp
github.com/grafana/grafana/vendor/golang.org/x/crypto/md4
github.com/grafana/grafana/vendor/github.com/denisenkom/go-mssqldb
github.com/grafana/grafana/pkg/tsdb/mssql
github.com/grafana/grafana/vendor/github.com/pkg/errors
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/internal/baggage
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/internal/spanlog
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/internal/throttler
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/log
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift-gen/jaeger
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift-gen/sampling
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift-gen/zipkincore
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift-gen/agent
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/utils
github.com/grafana/grafana/vendor/github.com/codahale/hdrhistogram
github.com/grafana/grafana/vendor/github.com/uber/jaeger-lib/metrics
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/thrift-gen/baggage
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/internal/baggage/remote
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/internal/throttler/remote
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/rpcmetrics
github.com/grafana/grafana/vendor/github.com/uber/jaeger-client-go/config
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/service/cloudwatch
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/private/protocol/ec2query
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/service/ec2
github.com/grafana/grafana/vendor/github.com/aws/aws-sdk-go/service/ec2/ec2iface
github.com/grafana/grafana/pkg/tsdb/elasticsearch/client
github.com/grafana/grafana/pkg/tsdb/elasticsearch
github.com/grafana/grafana/pkg/tsdb/graphite
github.com/grafana/grafana/pkg/tsdb/influxdb
github.com/grafana/grafana/pkg/tsdb/mysql
github.com/grafana/grafana/pkg/tsdb/opentsdb
github.com/grafana/grafana/pkg/tsdb/postgres
github.com/grafana/grafana/vendor/github.com/prometheus/client_golang/api
github.com/grafana/grafana/vendor/github.com/prometheus/client_golang/api/prometheus/v1
github.com/grafana/grafana/pkg/tsdb/prometheus
github.com/grafana/grafana/pkg/services/sqlstore/migrator
github.com/grafana/grafana/pkg/registry
github.com/grafana/grafana/pkg/services/sqlstore/migrations
github.com/grafana/grafana/pkg/services/search
github.com/grafana/grafana/pkg/services/dashboards
github.com/grafana/grafana/pkg/plugins
github.com/grafana/grafana/pkg/services/cleanup
github.com/grafana/grafana/pkg/services/notifications
github.com/grafana/grafana/pkg/services/provisioning/dashboards
github.com/grafana/grafana/pkg/services/provisioning
github.com/grafana/grafana/pkg/api/dtos
github.com/grafana/grafana/pkg/api/pluginproxy
github.com/grafana/grafana/pkg/api/live
github.com/grafana/grafana/pkg/metrics
github.com/grafana/grafana/pkg/tracing
github.com/grafana/grafana/pkg/middleware
github.com/grafana/grafana/pkg/services/sqlstore
github.com/grafana/grafana/pkg/services/rendering
github.com/grafana/grafana/pkg/services/alerting
github.com/grafana/grafana/pkg/api
github.com/grafana/grafana/pkg/services/alerting/conditions
github.com/grafana/grafana/pkg/services/alerting/notifiers
github.com/grafana/grafana/pkg/tsdb/cloudwatch
github.com/grafana/grafana/pkg/cmd/grafana-server
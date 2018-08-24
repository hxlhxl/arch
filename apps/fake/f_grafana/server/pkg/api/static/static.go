package httpstatic

import (
	"os"
	"sync"
	"log"
	"strings"
	"net/http"
	"path"
	"path/filepath"
	"gopkg.in/macaron.v1"
)

var Root string

func init() {
	var err error
	Root, err = os.Getwd()
	if err != nil {
		panic("error getting work directory: " + err.Error())
	}
}

type StaticOptions struct {
	Prefix			string
	SkipLogging		bool
	IndexFile		string
	AddHeaders		func(ctx *macaron.Context)
	FileSystem		http.FileSystem
}

type staticMap struct {
	lock		sync.RWMutex
	data		map[string]*http.Dir
}

func (sm *staticMap) Set(dir *http.Dir) {
	sm.lock.Lock()
	defer sm.lock.Unlock()

	sm.data[string(*dir)] = dir
}

func (sm *staticMap) Get(name string) *http.Dir {
	sm.lock.RLock()
	defer sm.lock.RUnlock()

	return sm.data[name]
}

func (sm *staticMap) Delete(name string) {
	sm.lock.Lock()
	defer sm.lock.Unlock()

	delete(sm.data, name)
}

var statics = staticMap{sync.RWMutex{}, map[string]*http.Dir{}}

// staticFileSystem implements http.FileSystem interface
type staticFileSystem struct {
	dir *http.Dir
}

func newStaticFileSystem(directory string) staticFileSystem {
	if !filepath.IsAbs(directory) {
		directory = filepath.Join(Root, directory)
	}
	dir := http.Dir(directory)
	statics.Set(&dir)
	return staticFileSystem{&dir}
}

func (fs staticFileSystem) Open(name string) (http.File, error) {
	return fs.dir.Open(name)
}

func prepareStaticOption(dir string, opt StaticOptions) StaticOptions {
	// Defaults
	if len(opt.IndexFile) == 0 {
		opt.IndexFile = "index.html"
	}
	// Normalize the prefix if provided
	if opt.Prefix != "" {
		// Ensure we hare a leading '/
		if opt.Prefix[0] != '/' {
			opt.Prefix = "/" + opt.Prefix
		}
		// Remove any trailing '/'
		opt.Prefix = strings.TrimRight(opt.Prefix, "/")
	}

	if opt.FileSystem == nil {
		opt.FileSystem = newStaticFileSystem(dir)
	}

	return opt
}

func prepareStaticOptions(dir string, options []StaticOptions) StaticOptions {
	var opt StaticOptions
	if len(options) > 0 {
		opt = options[0]
	}
	return prepareStaticOption(dir, opt)
}

func staticHandler(ctx *macaron.Context, log *log.Logger, opt StaticOptions) bool {
	if ctx.Req.Method != "GET" && ctx.Req.Method != "HEAD" {
		return false
	}

	file := ctx.Req.URL.Path
	// if we have a prefix, filter requests by stripping the prefix
	if opt.Prefix != "" {
		if !strings.HasPrefix(file, opt.Prefix) {
			return false
		}
		file = file[len(opt.Prefix):]
		if file != "" && file[0] != '/' {
			return false
		}
	}

	f, err := opt.FileSystem.Open(file)
	if err != nil {
		return false
	}
	defer f.Close()

	fi, err := f.Stat()
	if err != nil {
		return true // File exists but fail to open.
	}

	// Try to serve index file
	if fi.IsDir() {
		// Redirect if missing trailing slash.
		if !strings.HasSuffix(ctx.Req.URL.Path, "/") {
			http.Redirect(ctx.Resp, ctx.Req.Request, ctx.Req.URL.Path+"/", http.StatusFound)
			return true
		}

		file = path.Join(file, opt.IndexFile)
		f, err = opt.FileSystem.Open(file)
		if err != nil {
			return false // Discard error.
		}
		defer f.Close()

		fi, err = f.Stat()
		if err != nil || fi.IsDir() {
			return true
		}
	}

	if !opt.SkipLogging {
		log.Println("[Static] Serving " + file)
	}

	// Add an Expires header to the static content
	if opt.AddHeaders != nil {
		opt.AddHeaders(ctx)
	}

	http.ServeContent(ctx.Resp, ctx.Req.Request, file, fi.ModTime(), f)
	return true
}

// Static returns a middleware handler that serves static files in the given directory.
func Static(directory string, staticOpt ...StaticOptions) macaron.Handler {
	opt := prepareStaticOptions(directory, staticOpt)

	return func(ctx *macaron.Context, log *log.Logger) {
		staticHandler(ctx, log, opt)
	}
}

// Statics registers multiple static middleware handlers all at once.
func Statics(opt StaticOptions, dirs ...string) macaron.Handler {
	if len(dirs) == 0 {
		panic("no static directory is given")
	}
	opts := make([]StaticOptions, len(dirs))
	for i := range dirs {
		opts[i] = prepareStaticOption(dirs[i], opt)
	}

	return func(ctx *macaron.Context, log *log.Logger) {
		for i := range opts {
			if staticHandler(ctx, log, opts[i]) {
				return
			}
		}
	}
}



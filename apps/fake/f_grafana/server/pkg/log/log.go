package log

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/inconshreveable/log15"
)

var Root log15.Logger
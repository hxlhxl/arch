package `encoding/json` implements encoding and decoding of JSON as defined in RFC7159


func Marshal(v interface{}) ([]byte, error)
    returns the json encoding of variable v.即把`go`中的变量转换为`JSON`编码

func Unmarshal(data []byte, v interface{}) error
    parse the JSON-encoded data and stores the result in the value pointed to by v.即把`JSON`编码的数据转换为`go`中的变量对象v。

func NewDecoder(r io.Reader) *Decoder
    returns a new decoder that reads from r.

type Decoder {
    // A Decoder reads and decodes JSON values from an input stream.
}

func (*Decoder) Decode((v interface{})) error
    reads the next JSON-encoded value from its input and stores it in the value pointed to by v.
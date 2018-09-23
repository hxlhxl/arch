

# 总体概览

```
var mongoose = require('mongose');
// mongoose lib导出的是Mongoose实例
var kittySchema = new mongoose.Schema({
  name: String
});

```
Mongoose原型链

```
var Connection = require(driver + '/connection');

function Mongoose() {
    this.connections = [];
    this.models = {};
    this.modelSchemas = {};
    this.options = {
        pluralization: true
    };
    const conn = this.createConnection();
    conn.models = this.models;
    this._pluralize = legacyPluralize;

    Object.defineProperty(this, 'plugins', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: [
            [saveSubdocs, {deduplicate: true}],
            [validateBeforeSave, {deduplicate: true}],
            [shardingPlugin, {deduplicate: true}],
            [removeSubdocs, {deduplicate: true}],
        ]
    })
}

Mongoose.prototype.createConnection = function(uri, options, callback) {
  const conn = new Connection(this);
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  this.connections.push(conn);

  if (arguments.length > 0) {
    return conn.openUri(uri, options, callback);
  }

  return conn;
};

Mongoose.prototype.Schema = Schema
Mongoose.prototype.Query = Query
Mongoose.prototype.Model = Model
Mongoose.prototype.Document = Document
Mongoose.prototype.mongo = require('mongodb)

Mongoose.prototype.__defineGetter__('connection', function() {
    return this.connections[0];
})
Mongoose.prototype.__defineSetter__('connection', function(v) {
    if (v instanceof Connection) {
        this.connections[0] = v;
        this.models = v.models;
    }
})

Mongoose.prototype.connect = function() {
    const conn = this.connection;
    return conn.openUri(arguments[0], arguments[1], arguments[2]).then(() => this);
}
```

# Getting Started
```
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var kittySchema = new mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

```




# Mongoose
Models defined on the `mongoose` instance are available to all connection created by the same `mongoose` instance.

mongoose.prototype.connect
    Parametes:
        - uris ...
    Returns:
        - <<Promise>>: resolves to `this` if connection succeeded 返回一个Promise如果连接成功，解析为Mongoose实例
        - 
mongoose.prototype.model
    Parametes:
        - name: model name
        - schema: Schema
        - collcetion: collection name
        - skipInit
    Returns:
        - <<Model>>: Model类

mongoose.prototype.connection
    Returns:
        «Connection»
    The default connection of the mongoose module.
    This is the connection used by default for every model created using mongoose.model.

# Model

Models are fancy constructors compiled from Schema definitions.
An instance of a model is called a document.
Models are responsible for creating and reading documents from the underlying MongoDB database.

Model()
    Parameters:
        - doc «Object» values with which to create the document
Model.prototype.save
    Parameters:
        - [options] «Object» options optional options
        - [options.safe] «Object» overrides schema's safe option
        - [options.validateBeforeSave] «Boolean» set to false to save without validating.
        - [fn] «Function» optional callback

    Returns:
        - «Promise,undefined» Returns undefined if used with callback or a Promise otherwise.
    Saves this document



# Connection
Mongoose允许在连接没有建立之前就映射Schema，而有些操作是需要到连接之后才能使用的，Connection就是其中之一，在没有成功建立connection之前，以下引用都是undefined.

Connection.prototype.db
    The mongodb.Db instance, set when the connection is opened(具体可看MongoDB Driver文档： http://mongodb.github.io/node-mongodb-native/3.1/api/Db.html)
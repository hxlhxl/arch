

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
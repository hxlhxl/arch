
// 向某些对象发送请求，但是不知道请求的接受者是谁，也不知道被请求的操作是什么。
// 在execute中规定了命令的接受者和即将发生的操作。

// 命令 模式的接受者被当成command对象的属性封装起来，同时约定执行命令的操作调用command.execute方法


// command是某种操作的对象包装,且暴露execute、undo(command对象记录oldState)、replay(commandStack记录一系列命令)、命令队列等接口
var setCommand = function(button,command) {
    button.onclick = function() {
        command.execute();
    };
}

// 宏命令： 一些列command构成的命令队列。macroCommand.execute执行这一系列命令。



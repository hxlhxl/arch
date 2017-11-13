/*

// 场景： 需要向某些对象发送请求，大师并不知道请求的接受者是谁，也不知道请求的具体操作是什么的时候。
// 命令、撤销、重做、队列

*/


var setCommand = function(button,command) {
    button.onclick = function() {
        command.execute();
    };
};

var MenuBar = {
    refresh: function() {
        console.log("刷新菜单目录");
    },
};

var SubMenu = {
    add: function() {
        console.log("增加子菜单");
    },
    del: function() {
        console.log("删除子菜单");
    },
};

var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
}

var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
}

var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
};


var refreshMenuBarCommand = new RefreshMenuBarCommand(menubar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);



setCommand(button1,refreshMenuBarCommand);
setCommand(button2,addSubMenuCommand);
setCommand(button3,delSubMenuCommand);




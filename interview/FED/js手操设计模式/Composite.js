// 将对象组合成树形结构，表示 部分-整体 的层次结构

// 例子： 扫描查杀病毒(Folder/File类,可以适当添加父子引用)
// 这个函数可以以树形结构构成命令.

var MacroCommand = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i=0,command;command=this.commandList[i++];) {
                command.execute();
            }
        }
    }
};

commandUnit = MacroCommand();
commandUnit.add(cmd1);
commandUnit.add(cmd2);

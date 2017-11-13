
/*

定义： 组合多个对象形成树形结构以表示具有“整体—部分”关系的层次结构。组合模式对单个对象（即叶子对象）和组合对象（即容器对象）的使用具有一致性，组合模式又可以称为“整体—部分”(Part-Whole)模式，它是一种对象结构型模式。
场景： 扫描文件夹

*/


var Command = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i=0,command;command = this.commandList[i++];) {
                command.execute();
            }
        },
    };
};

var cmdA = Command();
cmdA.add(cmd_a1);
cmdA.add(cmd_a2);

var cmdB = Command();
cmdB.add(cmd_b1);
cmdB.add(cmd_b2);

var cmdC = Command();
cmdC.add(cmdA);
cmdC.add(cmdB);


cmdC.execute();




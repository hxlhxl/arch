/*

定义：　运用共享技术有效地支持大量细粒度对象的复用。系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式。
场景：　大量使用对象的地方，一般可以使用该模式优化。
目标：　将对象的属性划分为内部状态与外部状态，目标是尽量减少共享对象的数量。
原则：　1. 内部状态存储于对象内部  2. 内部状态可以被一些对象共享    3. 内部状态独立于具体的场景 ４.　外部状态取决于具体场景

*/






var uploadDemo = function() {
    var Upload = function(uploadType) {
        this.uploadType = uploadType;
    };
    Upload.prototype.delFile = function(id) {
        uploadManager.setExternalState(id,this);
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom);
        }
        if (window.confirm('确定要删除该文件吗?'+this.fileName)) {
            return this.dom.parentNode.removeChild(this.dom);
        }
    };
    var UploadFactory = (function() {
        var createdFlyWeightObjs = {};
        return {
            create: function(uploadType) {
                if (createdFlyWeightObjs[uploadType]) {
                    return createdFlyWeightObjs[uploadType];
                }
                return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
        };
    })();
    var uploadManager = (function(){
        var uploadDatabase = {};
        return {
            add: function(id,uploadType,fileName,fileSize) {
                var flyWeightObj = UploadFactory.create(uploadType);
                var dom = document.createElement('div');
                dom.innerHTML = 
                                                    '<span>文件名称:' + fileName + ',文件大小: '+fileSize+'</span>' +
                                                    '<button class="dolFile">删除</button>';
                dom.querySelector('.delFile').onclick = function() {
                    flyWeightObj.delFile(id);
                };
                document.body.appendChild(dom);
                uploadDatabase[id] = {
                    fileName: fileName,
                    fileSize: fileSize,
                    dom: dom,
                };
                return flyWeightObj;
            },
            setExternalState: function(id,flyWeightObj) {
                var uploadData = uploadDatabase[id];
                for (var i in uploadData) {
                    flyWeightObj[i] = uploadData[i];
                }
            },
        }
    })();
    var id = 0;
    window.startUpload = function(uploadType,files) {
        for (var i = 0,file;file = files[i++];) {
            var uploadObj = uploadManager.add(++id,uploadType,file.fileName,file.fileSize);
        }
    };
    startUpload('plugin',[
        {
            fileName: '1.txt',
            fileSize: 1000,
        },
        {
            fileName: '2.html',
            fileSize: 3000,
        },
        {
            fileName: '3.txt',
            fileSize: 5000,
        }
    ]);
    startUpload('flash',[
        {
            fileName: '4.txt',
            fileSize: 1000,
        },
        {
            fileName: '5.html',
            fileSize: 3000,
        },
        {
            fileName: '6.txt',
            fileSize: 5000,
        }
    ]);

}


// 适配器模式【电源适配器】
// 某个对象的暴露方法不合适，使用适配器包装一下就可以了


var googleMap = {
    show: function() {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    display: function() {
        console.log('开始渲染百度地图');
    }
}
var baiduMapAdapter = {
    show: function() {
        return baiduMap.display();
    }
}
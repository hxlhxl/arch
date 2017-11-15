/*

适配器(Adapter/Wrapper)模式: 适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。
例子： 电脑电源
场景： 试图调用模块或者对象的某个接口的时候，却发现这个接口的格式并不符合目前的需求。

*/


var solution = {
    one: function () {
        var googleMap = {
            show: function () {
                console.log('开始渲染谷歌地图');
            }
        };
        var baiduMap = {
            show: function () {
                console.log("开始渲染百度地图");
            }
        };
        var renderMap = function (map) {
            if (map.show instanceof Function) {
                map.show();
            }
        };
        renderMap(googleMap);
        renderMap(baiduMap);
    },
    adapterOne: function () {
        var googleMap = {
            show: function () {
                console.log('开始渲染谷歌地图');
            }
        };
        var baiduMap = {
            display: function () {
                console.log("开始渲染百度地图");
            }
        };
        var baiduMapAdapter = {
            show: function () {
                return baiduMap.display();
            }
        };
        var renderMap = function (map) {
            if (map.show instanceof Function) {
                map.show();
            }
        };
        renderMap(googleMap);
        renderMap(baiduMapAdapter);
    },
    two: function () {
        var getGuangdongCity = function () {
            var guangdongCity = [{
                name: 'shenzhen',
                id: 11,
            }, {
                name: 'guangzhou',
                id: 12,
            }];
        };
        var render = function(fn) {
            console.log("开始渲染广东省地图");
            document.write(JSON.stringify(fn()));
        };
        render(getGuangdongCity);
    },
    adapterTwo: function() {
        var guangdongCity = {
            shenzhen: 11,
            guangzhou: 12,
            zhuhai: 13,
        };
        var getGuangdongCity = function () {
            var guangdongCity = [{
                name: 'shenzhen',
                id: 11,
            }, {
                name: 'guangzhou',
                id: 12,
            }];
        };
        var render = function(fn) {
            console.log("开始渲染广东省地图");
            document.write(JSON.stringify(fn()));
        };
        var addressAdapter = function(oldAddressFn) {
            var address = {},
                    oldAddress = oldAddressFn();
            for (var i=0,c;c=oldAddress[i++];) {
                address[c.name] = c.id;
            }
            return function() {
                return address;
            };
        }
        render(addressAdapter(getGuangdongCity));
    }
}
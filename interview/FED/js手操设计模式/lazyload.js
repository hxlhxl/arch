// 原理： 
// 定时器计算视窗中是否有img元素
// 如果有，则定义img.src = img.getAttribute('loadpic')
<script>
    var imgs = document.getElementsByTagName('img');
    // 获取视口高度与滚动条的偏移量
    function lazyload(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var viewportSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        for(var i=0; i<imgs.length; i++) {
            var x =scrollTop+viewportSize-imgs[i].offsetTop;
            if(x>0){
                imgs[i].src = imgs[i].getAttribute('loadpic');   
            }
        }
    }

    setInterval(lazyload,1000);
</script>

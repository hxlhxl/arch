/*

状态模式：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
现实：　开关【开：灯亮，关：灯熄灭】

*/

// 状态机
var solution = {
    one: function() {
        var OffLightState = function(light) {
            this.light = light;
        };
        OffLightState.prototype.buttonWasPressed = function() {
            console.log('弱光');
            this.light.setState(this.light.weakLightState);
        };
        var WeakLightState = function(light) {
            this.light = light;
        };
        WeakLightState.prototype.buttonWasPressed = function() {
            console.log('强光');
            this.light.setState(this.light.strongLightState);
        };
        var StrongLightState = function(light) {
            this.light = light;
        };
        StrongLightState.prototype.buttonWasPressed = function() {
            console.log('关灯');
            this.light.setState(this.light.offLightState);
        };
        var Light = function() {
            // 对象内部保存各种状态，点击按钮之后出发状态的改变
            this.offLightState  = new OffLightState(this);
            this.weakLightState = new WeakLightState(this);
            this.strongLightState = new StrongLightState(this);
            this.button = null;
        };
        Light.prototype.init = function() {
            var button = document.createElement('button'),
                    self = this;
            this.button = document.body.appendChild(button);
            this.button.innerHTML = '开关';
            this.currState = this.offLightState;
            this.button.onclick = function() {
                self.currState.buttonWasPressed();
            }
        };
        Light.prototype.setState = function(newState) {
            this.currState = newState;
        };
        var light = new Light();
        light.init();
    },

    two: function() {
        var Light = function () {
            this.currState = FSM.off; // 设置当前状态
            this.button = null;
        };
        Light.prototype.init = function () {
            var button = document.createElement('button'),
                self = this;
            button.innerHTML = '已关灯';
            this.button = document.body.appendChild(button);
            this.button.onclick = function () {
                self.currState.buttonWasPressed.call(self);
            };
        };
        var FSM = {
            off: {
                buttonWasPressed: function () {
                    console.log('关灯');
                    this.button.innerHTML = '下一次按我是开灯';
                    this.currState = FSM.on;
                }
            },
            on: {
                buttonWasPressed: function () {
                    console.log('开灯');
                    this.button.innerHTML = '下一次按我是关灯';
                    this.currState = FSM.off;
                }
            }
        };
        var light = new Light();
        light.init();
    }
}



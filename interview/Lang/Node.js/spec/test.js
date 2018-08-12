const A = 'A'


var b = {
    [A](state,mutestatus) {
        state.mute=mutestatus;
    }
}

console.log(b);
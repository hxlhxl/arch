
module.exports = class HelloWebpackPlugin {
    constructor(options = {}) {

    }

    apply(compiler) {
        console.log("hello-webpack-plugin......");
        console.log(Object.keys(compiler.hooks));
        compiler.hooks.compilation.tap('HelloWebpackPlugin', function (compilation) {
            compilation.plugin("optimize", function () {
                console.log("Assets are being optimized.");
            });
        });
    }
}
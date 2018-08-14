
# Documentation

[ng api](https://docs.angularjs.org/api)

# Stackoverflow
https://stackoverflow.com/questions/17144180/angularjs-loading-screen-on-ajax-request

https://stackoverflow.com/questions/35999072/what-is-the-equivalent-of-bluebird-promise-finally-in-native-es6-promises


https://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS


# x

- $scope与this的区别
    $scope是template编译之后，一个作用域；在编译期间，this指向directive本身
    在编译期间，在this上绑定函数，由于是在directive本身(return的那个对象{template:,link:,...})，实际没啥作用。
    在$scope上绑定函数，函数中的this是$childScope
- compile,link和controller的关系
    https://stackoverflow.com/questions/15676614/link-vs-compile-vs-controller
- 在template阶段不要操作controller中的值，可能引起意外的bug，比如在v-if中对$scope中的变量赋值，导致后续v-modle不生效的bug.
- ng-change的问题
    https://stackoverflow.com/questions/24802627/angular-ng-change-not-firing-when-ng-model-is-changed
- directive_scope问题
    https://docs.angularjs.org/api/ng/service/$compile#-scope-
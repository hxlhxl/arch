// app entry
requirejs.config({
    paths: {
        // 这里一定要使用jquery！ http://requirejs.org/docs/jquery.html#modulename
        jquery: 'vendor/jquery-3.2.1',
        vue: 'https://cdn.jsdelivr.net/npm/vue?',
        requests: 'requests',
        user: 'user',
    }
});
require(['user'],function(user) {
    console.log(user);
    user.getUser();
});

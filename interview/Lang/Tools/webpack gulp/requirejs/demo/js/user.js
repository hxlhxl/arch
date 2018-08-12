// require.config({
//     paths: {
//         jQuery: 'vendor/jquery-3.2.1',
//         vue: 'https://cdn.jsdelivr.net/npm/vue?',
//         requests: 'requests',
//         user: 'user',
//     }
// });

// module user

define(['./requests'], function (requests) {
    const user = {
        getUser: function () {
            requests.get({
                method: 'GET',
                url: "https://cdn.jsdelivr.net/npm/vue?"
            })
        },
    };
    return user;
})
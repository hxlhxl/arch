// module requests

define(['jquery'], function ($) {
    const requests = {
        get: $.ajax,
        post: $.ajax,
    };
    return requests;
})
require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min',
        'jqlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'jqcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
    },
    shim: {
        'jqlazyload': {
            deps: ['jquery'],
            exports: 'jqlazyload'
        },
        'jqcookie': {
            deps: ['jquery'],
            exports: 'jqcookie'
        }
    }
});

require(['jquery'], function() {
    let $modulepage = $('#currentpage').attr('data-origin');
    require([$modulepage], function(modulepage) {
        modulepage.init();
    });
});
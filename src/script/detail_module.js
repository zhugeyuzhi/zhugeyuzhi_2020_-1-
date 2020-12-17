define(['jqcookie'], function() {
    return {
        init: function() {
            // 
            let $sid = +window.location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            $.ajax({
                url: 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                // $('.product_img').attr('href', data.image);
                $('#productImg').attr({
                    'alt': data.info,
                    'src': data.image,
                    'title': data.title
                });
                $('.zoomWrapperImage img').attr('src', data.bimg);
                $('.item_number').html('商品编号：' + data.sid);
                $('.middle_property').find('h1').html(data.title);
                $('.good_price').html('￥' + data.price);
                $('.numComments>a').html(data.comment);
                // console.log($('#productImg'));

                // 小图的循环渲染
                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '';
                const $list = $('#thumblist');
                $.each($picurl, function(index, value) {
                    $strhtml += `<li><a class="" href="javascript:void(0);"><img src="${value}"></a></li>`;
                });
                $list.html($strhtml);



                // const $list = $('#thumblist'); // 小图列表
                // 
                $list.on('mousemove', 'li', function() {
                    let imgurl = $(this).find('img').attr('src');
                    $('#productImg').attr('src', imgurl);
                    $('#bpic').attr('src', imgurl);
                    $(this).addClass('active').siblings().removeClass('active');
                });

                const $left = $('.imgprev'); // 左箭头
                const $right = $('.imgnext'); // 右箭头
                let $num = 5; //列表显示的图片个数,重要的信息
                $right.on('click', function() {
                    let $lists = $('#thumblist').find('li');
                    // console.log($lists.length);
                    if ($lists.length > $num) { //限制点击的条件，如果$num值小于li的长度，继续点击右键头
                        $num += 5;
                        // $left.css('color', '#333');
                        $left.show();
                        if ($lists.length >= $num - 4) {
                            // $right.css('color', '#fff');
                            $right.hide();
                        }
                        //列表运动
                        console.log($lists.eq(0).outerWidth(true));
                        $list.animate({
                            left: -($num - 5) * $lists.eq(0).outerWidth(true)
                        });
                    }
                });
                $left.on('click', function() {
                    let $lists = $('#thumblist').find('li');
                    if ($num > 5) { //限制点击的条件
                        $num -= 5;
                        // $right.css('color', '#333');
                        $right.show();
                        if ($num <= 5) {
                            // $left.css('color', '#fff');
                            $left.hide();
                        }
                        $list.animate({
                            left: -($num - 5) * $lists.eq(0).outerWidth(true)
                        });
                    }
                });


            });

            // #productImg 小图
            // .zoomPreload 小放
            // .zoomWrapperImage img 大图
            // .zoomWrapperImage 大放
            // .zoomWindow 大放和大图的 warp
            const $spic = $('#productImg'); // 小图
            const $bpic = $('.zoomWrapperImage').find('img'); // 大图
            const $sf = $('.zoomPup'); // 小放
            const $bf = $('.zoomWrapperImage'); // 大放

            //小放/大放=小图/大图
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果

            $('.zoomPad').hover(function() {
                $sf.show();
                $('.zoomWindow').show();
                $(this).on('mousemove', function(ev) {
                    let $leftvalue = ev.pageX - $('#productImg').offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $('#productImg').offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width();
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height();
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili,
                    });

                });
            }, function() {
                $sf.hide();
                $('.zoomWindow').hide();
            });


            let arrsid = []; //存储商品的sid
            let arrnum = []; //存储商品的数量
            function getcookietoarray() {
                // console.log($.cookie('cookiesid') && $.cookie('cookienum'));
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    // console.log('cc');
                    arrsid = [];
                    arrnum = [];
                }
            }
            $('.btn_shopping_cart').on('click', function() {
                getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                if ($.inArray('' + $sid, arrsid) === -1) { //第一次添加商品
                    arrsid.push($sid); //添加sid
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#product_amount').val()); //添加数量
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else { //多次添加，数量累加
                    //通过$sid获取商品的数量所在的位置。
                    let $index = $.inArray('' + $sid, arrsid);
                    //原来的数量+新加的数量进行重新赋值，添加cookie
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#product_amount').val()); //重新赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('商品已加入购物车');
                // location.reload();
            });
        }
    }
});
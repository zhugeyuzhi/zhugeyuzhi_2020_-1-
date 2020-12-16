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
            const $left = $('.imgprev'); // 左箭头
            const $right = $('.imgnext'); // 右箭头
            const $list = $('#thumblist'); // 小图列表

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

            $list.on('mousemove', 'li', function() {
                let imgurl = $(this).find('img').attr('src');
                $('#productImg').attr('src', imgurl);
                $('#bpic').attr('src', imgurl);
                $(this).addClass('active').siblings().removeClass('active');
            });

            // TODO::
            // $left = $('.imgprev'); // 左箭头
            // $right = $('.imgnext'); // 右箭头


        }
    }
});
define([], function() {
    return {
        init: function() {
            // headermainnav 头部主要导航
            let $allSortlis = $('.allSortli');
            $allSortlis.each(function() {
                $(this).hover(function() {
                    $(this).find('.category').show();
                }, function() {
                    $(this).find('.category').hide();
                });
            });
            // 楼梯效果
            let $floornav = $('#elevator_n');
            let $floorli = $('#elevator_n .two_line').not('.last');
            let $floors = $('.floor_name');
            // console.log($floors.length);

            // 滚楼楼梯事件
            function scroll() {
                var $scrolltop = $(window).scrollTop();
                // console.log($scrolltop);
                if ($scrolltop >= 630) {
                    $floornav.show();
                } else {
                    $floornav.hide();
                }

                $floors.each(function(index, element) {
                    let $floortop = $(element).offset().top;
                    if ($floortop >= $scrolltop) {
                        // $floorli.removeClass('active').find('a:nth-child(2)').removeClass('active');
                        // $floors.removeClass('active');
                        // $floorli.eq(index).addClass('active').find('a:nth-child(2)').addClass('active');
                        // $floors.eq(index).addClass('active');
                        floor_click(index);
                        return false;
                    }
                });
            }

            function floor_click(index) {
                $floorli.removeClass('active').find('a:nth-child(2)').removeClass('active');
                $floors.removeClass('active');
                $floorli.eq(index).addClass('active').find('a:nth-child(2)').addClass('active');
                $floors.eq(index).addClass('active');
            }
            scroll();
            $(window).on('scroll', function() {
                scroll();
            });

            // 跳楼点击事件
            $floorli.on('click', function() {
                $(window).off('scroll');
                // $(this).addClass('active').siblings('li').removeClass('active');

                // 
                // $floorli.removeClass('active').find('a:nth-child(2)').removeClass('active');
                // $floors.removeClass('active');
                // $floorli.eq($(this).index()).addClass('active').find('a:nth-child(2)').addClass('active');
                // $floors.eq($(this).index()).addClass('active');


                let $floortop = $floors.eq($(this).index()).offset().top;
                $('html').stop().animate({
                    scrollTop: $floortop
                }, 100, function() {
                    $(window).on('scroll', function() {
                        scroll();
                    });
                });

            });

            $('.last').on('click', function() {
                $('html').animate({
                    scrollTop: 0
                });
            });


            //检测是否用户已经登录
            if (localStorage.getItem('loginname')) {
                $('.admin').show();
                $('.login').hide();
                $('.admin span').html(localStorage.getItem('loginname'));
            }

            //退出登录 - 删除本地存储
            $('.admin a').on('click', function() {
                $('.admin').hide();
                $('.login').show();
                localStorage.removeItem('loginname');
            });
        }
    }
});
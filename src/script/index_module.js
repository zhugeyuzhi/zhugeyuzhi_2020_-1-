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
                        $floorli.removeClass('active');
                        $floorli.find('a:nth-child(2)').removeClass('active');
                        $floorli.eq(index).addClass('active');
                        $floorli.eq(index).find('a:nth-child(2)').addClass('active');
                        return false;
                    }
                });
            }
            scroll();
            $(window).on('scroll', function() {
                scroll();
            });

            // 跳楼点击事件
            $floorli.on('click', function() {
                $(window).off('scroll');
                // $(this).addClass('active').siblings('li').removeClass('active');

                $floorli.removeClass('active');
                $floorli.find('a:nth-child(2)').removeClass('active');
                $floorli.eq($(this).index()).addClass('active');
                $floorli.eq($(this).index()).find('a:nth-child(2)').addClass('active');
                // console.log($(this).index());
                let $floortop = $floors.eq($(this).index()).offset().top;
                $('html').animate({
                    scrollTop: $floortop
                }, function() {
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


        }
    }
});
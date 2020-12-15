define(['pagination', 'jqlazyload'], function() {
    return {
        init: function() {
            // 1.渲染
            $list = $('.itemSearchList');
            let $array_default = []; //排序前的li放入此数组。
            let $array = []; //排序后的数组
            let $prev = []; //li里面的商品的前一个价格
            let $next = []; //li里面的商品的后一个价格
            $.ajax({
                url: 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/php/pagelist.php',
                dataType: 'json'
            }).done(function(listdata) {
                data = listdata.pagedata; //获取接口里面数据
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <div class="itemSearchResultCon">
                                <a href="${value.url}" class="product_pic pro_img">
                                    <img alt="${value.title}" src="${value.image}">
                                </a>
                                <p class="price clearfix"><span>${value.price}</span></p>
                                <p class="titleBox">
                                    <a class="productName" href="${value.src}"><span class="list_lable_self"></span> ${value.info}</a>

                                    <a href="detail.html?sid=${value.sid}" title="${value.title}" class="promoTitle">满199减20 288减40</a>
                                </p>

                                <div class="sell_type_div">
                                    <span class="comment comment_right"><a href="javascript:void(0);">评论 <em>${value.commit}</em>条</a></span>
                                    <span class="goldseller_name self_name">1药网自营</span>
                                    <div class="browse"></div>
                                </div>

                                <div class="search_list_op">
                                    <input type="button" class="search_list_reduce_gray">
                                    <input type="text" value="1" class="num">
                                    <input type="button" class="search_list_plus">
                                    <button class="buy op_right_btn add_cart_btn border_left">加入购物车</button>
                                </div>

                                <u class="bg_border"></u>
                            </div>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                // 默认顺序输出
                $('.itemSearchList li').each(function(index, element) {
                    $array_default[index] = $(this); //排序前
                    $array[index] = $(this); //排序后
                });
                console.log($array_default);

                // 2.分页
                $('.page').pagination({
                    pageCount: listdata.pageno, //总的页数
                    jump: true, //是否开启跳转到指定的页数，布尔值。
                    prevContent: '上一页', //将图标改成上一页下一页。
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent()); //获取当前的点击的页码。
                        $.ajax({
                            url: 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/php/pagelist.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(listdata) {
                            data = listdata.pagedata; //获取接口里面数据
                            let $strhtml = '';
                            $.each(data, function(index, value) {
                                $strhtml += `
                                    <li>
                                        <div class="itemSearchResultCon">
                                            <a href="${value.url}" class="product_pic pro_img">
                                                <img alt="${value.title}" src="${value.image}">
                                            </a>
                                            <p class="price clearfix"><span>${value.price}</span></p>
                                            <p class="titleBox">
                                                <a class="productName" href="${value.src}"><span class="list_lable_self"></span> ${value.info}</a>
            
                                                <a href="detail.html?sid=${value.sid}" title="${value.title}" class="promoTitle">满199减20 288减40</a>
                                            </p>
            
                                            <div class="sell_type_div">
                                                <span class="comment comment_right"><a href="javascript:void(0);">评论 <em>${value.commit}</em>条</a></span>
                                                <span class="goldseller_name self_name">1药网自营</span>
                                                <div class="browse"></div>
                                            </div>
            
                                            <div class="search_list_op">
                                                <input type="button" class="search_list_reduce_gray">
                                                <input type="text" value="1" class="num">
                                                <input type="button" class="search_list_plus">
                                                <button class="buy op_right_btn add_cart_btn border_left">加入购物车</button>
                                            </div>
            
                                            <u class="bg_border"></u>
                                        </div>
                                    </li>
                                `;
                            });
                            $list.html($strhtml);
                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });



                            // 将li元素添加到排序前的数组中。
                            $('.itemSearchList li').each(function(index, element) { //element:原生的元素对象
                                $array_default[index] = $(this); //排序前
                                $array[index] = $(this); //排序后
                            });
                            console.log($array_default);

                        });
                    }
                });

                // 点击按钮进行排序
                $('.data_sort').eq(0).on('click', function() {
                    $.each($array_default, function(index, value) {
                        $list.append(value);
                    });
                });

                // 降序
                $('.data_sort').eq(1).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - 1 - i; j++) {
                            $prev = parseFloat($array[j].find('.price span').html());
                            $next = parseFloat($array[j + 1].find('.price span').html());
                            if ($prev < $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });

                // 升序
                $('.data_sort').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - 1 - i; j++) {
                            $prev = parseFloat($array[j].find('.price span').html());
                            $next = parseFloat($array[j + 1].find('.price span').html());
                            if ($prev > $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });

            });


            // 导航
            $('.allSorttit').hover(function() {
                $('.allSortul').show();
            }, function() {
                $('.allSortul').hide();
            });

            $('.allSortul').hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });

            // 
            let $allSortlis = $('.allSortli');
            $allSortlis.each(function() {
                $(this).hover(function() {
                    $(this).find('.category').show();
                }, function() {
                    $(this).find('.category').hide();
                });
            });

        }
    }
});
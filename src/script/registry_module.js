define([], function() {
    return {
        init: function() {
            // 手机号
            let $email = $('#email');
            // 密码
            let $pass = $('#password');
            // 确认密码
            // let $pass2 = $('#password2');
            // 注册按钮
            let $regist = $('#registerButton')

            $passflag = true;
            $emailflag = true;

            $email.on('focus', function() {
                $(this).removeClass('empty').removeClass('error').siblings('#email_empty').hide().siblings('#email_error').html('').hide().siblings('.i_true').hide();
            });
            $email.on('blur', function() {
                let $value = $email.val();
                if ($value !== '') {
                    let $reg = /^1[3|5|7|8|9]\d{9}$/g;
                    if ($reg.test($value)) {
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/php/cm.php',
                            data: {
                                'phone': $value
                            }
                        }).done(function(data) {
                            console.log(!data);
                            if (!data) {
                                $email.siblings('.i_true').show();
                                $emailflag = true;
                            } else {
                                $email.addClass('error').siblings('#email_error').html('该用户名已被注册').show().addClass('error');
                                $emailflag = false;
                            }
                        });
                    } else {
                        $email.addClass('error').siblings('#email_error').html('手机号格式不正确').show().addClass('error');
                        $emailflag = false;
                    }
                } else {
                    $email.addClass('empty').siblings('#email_empty').html('不能为空').show();
                    $emailflag = false;
                }
            });


            $pass.on('focus', function() {
                $(this).removeClass('empty').removeClass('error').siblings('#password_empty').hide().siblings('#password_error').html('').hide().siblings('#password_true').hide().siblings('#password_tip').show();
            });
            $pass.on('input', function() {
                let $value = $pass.val();
                if ($value !== '') {
                    $pass.siblings('#password_tip').hide();
                    let $len = $(this).val().length;
                    if ($len >= 6 && $len <= 20) {
                        let $count = 0;
                        if (/\d+/g.test($(this))) {
                            $count++;
                        }
                        if (/[A-Za-z]+/g.test($(this))) {
                            $count++;
                        }
                        if (/[\W_]+/g.test($(this))) {
                            $count++;
                        }
                        switch ($count) {
                            case 1:
                                // 弱
                                break;
                            case 2:
                            case 3:
                                // 强
                                // $pass.siblings('#password_true').show();
                                $pass.removeClass('error').removeClass('empty').siblings('#password_error').removeClass('error').html('').hide();
                                $pass.siblings('#password_true').show();
                                break;
                        }
                        $passflag = true;
                    } else {
                        $pass.addClass('error').siblings('#password_error').html('密码长度不正确').show().addClass('error');
                        $passflag = false;
                    }
                } else {
                    $pass.siblings('#password_tip').show().siblings('#password_error').html('').hide();
                    $passflag = false;
                }
            });
            $pass.on('blur', function() {
                if ($pass.val() !== '') {
                    if ($passflag) {
                        $pass.removeClass('error').removeClass('empty').siblings('#password_error').html('').hide().siblings('#password_true').show();
                    }
                } else {
                    $pass.addClass('error').siblings('#password_error').addClass('error').html('不能为空').show().siblings('#password_tip').hide();
                }
            });



            //阻止表单的直接跳转。
            $regist.on('click', function() {
                if ($email.val() === '') {
                    $email.addClass('empty').siblings('#email_empty').html('不能为空').show();
                    $emailflag = false;
                }
                if ($pass.val() === '') {
                    $pass.addClass('error').siblings('#password_empty').show().siblings('#password_error').show().addClass('error');
                    $pass = false;
                }

                console.log($emailflag);
                console.log($passflag);

                if ($passflag && $emailflag) {
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/php/regist.php',
                        data: {
                            'phone': $email.val(),
                            'password': $pass.val()
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        if (data) {
                            window.location = 'http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/src/login.html';
                        }
                    });
                }
            });


        }
    }
});
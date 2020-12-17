<?php
include "conn.php";

if(isset($_POST['phone']) && isset($_POST['password'])){
    $phone = $_POST['phone'];
    $pass = sha1($_POST['password']);//加密和加密进行匹配
    $result = $conn->query("insert 111_userdata values(null,'$phone','$pass',null,null)");//将数据传递给数据库。
    if($result){
        echo true;
    }else{
        echo false;
    }
    
    // if($result->fetch_assoc()){
        //一旦数据提交成功，回到前端的登录页面
        // header('location:http://10.31.161.59/dashboard/zhugeyuzhi_2020_111/src/login.html');
    // }
}

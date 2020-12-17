<?php
//1.连接数据库
include "conn.php";
// echo(sha1('333aaa'));
if(isset($_POST['user']) && isset($_POST['pass'])){
    $user = $_POST['user'];
    $pass = sha1($_POST['pass']);//加密和加密进行匹配
    $result=$conn->query("select * from 111_userdata where useremail='$user' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;//用户名和密码匹配成功
    }else{
        echo false;//用户名和密码匹配失败
    }
}
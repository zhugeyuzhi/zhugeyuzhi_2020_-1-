<?php
include "conn.php";

if(isset($_POST['phone'])){
    $phone = $_POST['phone'];
    $result=$conn->query("select * from 111_userdata where useremail=$phone");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
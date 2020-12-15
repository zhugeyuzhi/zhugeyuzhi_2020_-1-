<?php
include "conn.php";

$result = $conn->query("select * from 111_listdata");
$num = $result->num_rows; 


$pagesize = 6;

$pagenum = ceil($num / $pagesize);


if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}


$page = ($pagevalue - 1) * $pagesize;
$res = $conn->query("select * from 111_listdata limit $page,$pagesize");

$arr = array();
for ($i=0;$i<$res->num_rows;$i++) {
    $arr[$i] = $res->fetch_assoc();
}

class pagedata{

};

$page = new pagedata();
$page->pagedata = $arr;
$page->pageno =$pagenum;


echo json_encode($page);
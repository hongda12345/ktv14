<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/20
 * Time: 11:38
 */

class rank{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/rank.html';
    }
    function query(){
        $sql="select * from song";
        $result=$this->db->query($sql);
        $data=[];
        while($row=$result->fetch_assoc()){
            array_push($data,$row);
        }
        echo json_encode($data);
    }
}
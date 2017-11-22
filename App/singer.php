<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/17
 * Time: 8:57
 */

class singer{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/singer.html';
    }
    function query(){
        $sql="select * from sort";
        $data=$this->db->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function select(){
        $sid=$_REQUEST['sid'];
        $result=$this->db->query("select * from sort where sid=$sid")->fetch_assoc();
        $data=$this->db->query("select sort.* , singer.* from sort,singer where sort.sid=$sid and singer.sid=$sid")->fetch_all(1);
        include 'App/views/singers.html';
    }
}
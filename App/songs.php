<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/17
 * Time: 17:28
 */

class songs{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/songs.html';
    }
    function query(){
        $rid=$_REQUEST['rid'];
        $arr=[];
        $result=$this->db->query("select * from song where rid=$rid")->fetch_all(1);
        $data=$this->db->query("select sort.sname, singer.* from sort,singer where singer.rid=$rid and singer.sid=sort.sid")->fetch_assoc();
        array_push($arr,$result);
        array_push($arr,$data);
        echo json_encode($arr);
    }
   /* function select(){
        $arr=[];
        $rid=$_REQUEST['rid'];
        $result=$this->db->query("select * from sort where sid=$rid")->fetch_assoc();
        $data=$this->db->query("select singer.rname, song.* from singer,song where singer.rid=$rid and song.rid=$rid")->fetch_all(1);
        array_push($arr,$result);
        array_push($arr,$data);
        echo json_encode($arr);
    }*/
}
<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/22
 * Time: 17:19
 */

class play{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/play.html';
    }
}
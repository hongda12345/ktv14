<?php
/**
 * Created by PhpStorm.
 * User: 宏达
 * Date: 2017/11/21
 * Time: 21:57
 */

class My{
    public $db;
    function __construct(){
        $obj=new db();
        $this->db=$obj->mysql;//获取数据
    }
    function index(){
        include 'App/views/My.html';
    }
}
$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
    ////////////////////////////////选项卡//////////////////////////////////////////////
    let lis=$('.search>li');
    console.log(lis);
    $(lis).on('click',function(){
        $(this).addClass("active").siblings().removeClass("active");
    })

    //////////////////////页面显示////////////////////////////////////////////
    let singersList=$('.singerslist>.scroll');
    let singersData=[];
    $.ajax('/php/ktv/index.php/rank/query',{
        method:'post',
        dataType:'json',
        success:function(data){
            console.log(data);
            singersData=data.filter(element=>{
                return element;
            });
            console.log(singersData);
            render(singersList,singersData);
            myScroll=new IScroll('.singerslist');
        }
    })
    function render(obj,data){
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
        <li>
        <span id="touxiang"><img src="${data[i]['gimg']}" alt=""></span>
        <div class="son">
            <span>${data[i]['gname']}</span>
            <span>${data[i]['gtime']}</span>
        </div>
        </li>
            `;
        }
        obj.html(str);
    }
})
$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    //////////////////////页面显示////////////////////////////////////////////
    let singersList=$('.singerslist>.scroll');
    let singersData=[];
    $.ajax('/php/ktv/index.php/recommend/query',{
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
$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    //////////////////////页面显示////////////////////////////////////////////
    let singerList=$('.singerlist>.scroll');
    let singerData=[];
    $.ajax('/php/ktv/index.php/singer/query',{
        method:'post',
        dataType:'json',
        success:function(data){
            render(singerList,data);
            myScroll=new IScroll('.singerlist');
        }
    })
    function render(obj,data){
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
        <li data='${JSON.stringify(data[i])}'>
            <a href="/php/ktv/index.php/singer/select?sid=${data[i]['sid']}">
                <img src="${data[i]['simg']}" alt="" name="simg">
                <div class="shadow">
                    <span class="sname">${data[i]['sname']}</span>
                </div>
            </a>      
        </li>
            `;
        }
        obj.html(str);
    }
})
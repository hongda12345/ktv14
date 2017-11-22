$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    let chooseList=JSON.parse(localStorage.song);//获取数据
    let count=JSON.parse(localStorage.count);//获取数据
    $('header> .num').html(count);
    let main=$('.scroll');
    ///////////////////////////减少歌曲//////////////////////////////////////////
    main.on('click','.reduce',function (e) {
        let songs=JSON.parse($(this).closest('.list').attr('data'));//对应商品信息
        console.log($(this).closest('.list').attr('data'));
        chooseList=chooseList.filter(ele => ele.gid!= songs.gid);//没有,就移除
        $(this).closest('.list').animate({marginLeft:'-100%'}).queue(function (e){
            $(this).closest('.list').remove();
        })
        localStorage.song=JSON.stringify(chooseList);
        /*console.log(chooseList)*/

    })
////////////////////////////顶置///////////////////////////////////////////////////////////////
    main.on('click','.toTop',function (e) {
        let songs=JSON.parse($(this).closest('.list').attr('data'));
        let gid=$(this).closest('.list').attr('id');
        let index=0;
        for(let i=0;i<chooseList.length;i++){
            if(chooseList[i].gid==gid){
                index=i;
            }
        }
        chooseList.unshift(chooseList.splice(index,1)[0]);
        render(main,chooseList);
    })
///////////////////////////选好歌曲/////////////////////////////////////////////////////////
    render(main,chooseList);
    /*//////////////////////页面显示////////////////////////////////////////////
    let singersList=$('.winelist>.scroll');
    let singersData=[];
    $.ajax('/php/ktv/index.php/tiped/query',{
        method:'post',
        dataType:'json',
        success:function(data){
            console.log(data);
            singersData=data.filter(element=>{
                return element;
            });
            console.log(singersData);
            render(singersList,singersData);
            myScroll=new IScroll('.winelist');
        }
    })*/
    function render(obj,data){
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            str+=`
        <li data='${JSON.stringify(data[i])}' class="list" id="${data[i]['gid']}">
            <a href="/php/ktv/index.php/play"><span id="touxiang"><img src="${data[i]['gimg']}" alt=""></span></a>
            <a href="/php/ktv/index.php/play">
            <div class="son">
                <span>${data[i]['gname']}</span>
                <span>${data[i]['gtime']}</span>
            </div>
            </a>
            <span class="reduce"></span>
            <span class="toTop"></span>
        </li>
            `;
        }
        obj.html(str);
    }
})
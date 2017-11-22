$(function(){
    let myScroll=new IScroll('.wrapper',{
        click:true
    });
    let rid=location.search.slice(location.search.indexOf('=')+1);
    let list='';
    $.ajax('/php/ktv/index.php/songs/query',{
        data:{rid},
        dataType:'json',
        success:function(data){
            $('.title>span').html(data[1]['rname']);
            $('header>p').html(data[1]['rname']);
            $('.touxiang>img').attr('src',data[1]['rimg']);
            $('.song>span.snum').html(data[1]['rnum']);
            $('.tips>span').html(data[1]['rhot']);
            console.log(data)
            render(data);
        }
    })
    function render(data){
        let str='';
        data[0].forEach((value,index)=>{
            str+=`
                <li data='${JSON.stringify(data[0][index])}' class="list">
                    <span id="xuhao">${index+1}</span>
                    <div class="son">
                        <span>${value.gname}</span>
                        <span>${value.gtime}</span>
                    </div>
                    <span class="add"></span>
                </li>
            `;
        })
        $('.scroll').html(str);
    }
    let chooseList=[];
    $('.scroll').on('click','.add',function(e){
        let tops=$(this).offset().top;
        let lefts=$(this).offset().left;
        let songs=JSON.parse($(this).closest('.list').attr('data'));
        if($(this).hasClass('rotate')){
            chooseList=chooseList.filter(ele=>ele.gid!=songs.gid);
        }else{
            chooseList.push(songs);
        }
        localStorage.setItem('song',JSON.stringify(chooseList));
        $(this).toggleClass('rotate');
        localStorage.setItem('count',chooseList.length);
        $('<div>').css({width:'20',height:'20',borderRadius:'50%',background:'#ff318d',position:'absolute',top:tops,left:lefts}).appendTo(document.body).animate({left:$('.aready').offset().left,top:$('.aready').offset().top}).queue(function(){
            $(this).remove();
        })
    })
    $('header>a:last-child').on('click',function (e) {
        location.href='/php/ktv/index.php/tiped';
    })
})
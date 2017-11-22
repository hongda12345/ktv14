$(function () {
    // let myScroll=new IScroll('.wrapper');
    let lyric;
    let playlist=JSON.parse(localStorage.song);
    let gid=location.search.slice(location.search.indexOf('=')+1);
    ///////////////////////////////查询歌曲在数据库中的下标/////////////////////////////
    let index=0;
    for(let i=0;i<playlist.length;i++){
        if(playlist[i]['gid']==gid){
            index=i;
        }
    }
    ///////////////////////////////取歌词/////////////////////////////
    $.ajax(`/php/ktv/Public/json/${playlist[index]['gname']}.json`,{
        success:function (data) {
            let value=data.lrc.lyric.split('\n');
            lyric=[];
            value.forEach(element=>{
                let t=element.substr(1,5);
                let c=element.substr(element.indexOf(']')+1);
                lyric.push({t,c});
            })
            console.log(lyric);
            render(playlist[index],lyric);
        }
    })
    function render(song,lyric) {
        console.log(song['music']);
        $('header>p.title').html(song['gname']);
        $('#audio').attr('src',song['music']);
        $('.counter').empty();
        let str='';
        lyric.forEach(ele=>{
            str+=`
              <li>${ele.c}</li>
            `
        })
        $('.counter').html(str);
    }
    ///////////////////////////////播放与暂停//////////////////////////////////////
    let audio=$('#audio');
    $('.play').on('click',function () {
        if(audio[0].paused){
            audio[0].play();
        }else{
            audio[0].pause();
        }
    })
    /////////////////////////////////////歌词同步/////////////////////////////////////////
       let a=0;
       audio[0].ontimeupdate=function () {
           let ct=timeModel(audio[0].currentTime);
           lyric.forEach((ele,i)=>{
               if(ele.t==ct){
                   console.log(i);
                   console.log(ele.t);
                   a=i;
                   if(a<=3){
                       a=0;
                   }else{
                       a-=3;
                   }
               }
;
           })
           console.log(ct);
           $('.conter').empty();
           let str='';
           for(let i=a;i<lyric.length;i++){
               str +=`
                 <li>${lyric[i]['c']}</li>
               `
           }
           $('.counter').html(str);
       }
    /////////时间----格式/////////
    function timeModel(time) {
        let m=Math.floor(time/60)<10 ? '0'+Math.floor(time/60) : Math.floor(time/60);
        let s=Math.floor(time%60)<10 ? '0'+Math.floor(time%60) : Math.floor(time%60);
        return m+':'+s;
    }














    // myScroll=new IScroll('.wrapper');

})
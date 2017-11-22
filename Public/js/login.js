$(function(){
    let user=$('#user');
    let pass=$('#pass');
    let sub=$(':submit');
    let form=$('form');
    $('input,textarea,select').on('blur',function(){
        let e=$(this);
        if(e.attr('data-validate')){
            let value=e.val().trim();
            let validate=e.attr('data-validate').split(';');
            let flag=true;
            for(let i=0;i<validate.length;i++){
                let arr=validate[i].split(':');
                if(!validateType(value,arr[0])){
                    $(this).closest('.form-group').find('.form-help').remove();
                    $('<div>').addClass('form-help').insertAfter(this).text(arr[1]).css({color:'red',marginTop:'0.3rem'});
                    flag=false;
                    break;
                }
            }
            if(flag){
                $(this).closest('.form-group').find('.form-help').remove();
            }
        }
    })
    function validateType(value,type){
        switch (type){
            case'require':
                return /[^(^\s*/\s*$)]/.test(value);
                break;
            case'username':
                return /^[a-zA-Z]{3,10}$/.test(value);
                break;
            case'password':
                return /^\w{6,10}$/.test(value);
                break;
        }
    }
    sub.on('click',function(){
        let data={user:user.val(),pass:pass.val()};
        $('input').trigger('blur');
        if($('form .form-help').length){
            return;
        }
/*        let data=form.serializeArray();//格式化表单数据
        let obj={};
        $.each(data,function(i,v){
            obj[v.name]=v.value;
        })*/
        $.ajax({
            url:'/php/ktv/index.php/login/check',
            data:data,
            success:function(data){
                if(data=='ok'){
                    location.href='/php/ktv/index.php/gamemanage';
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
        return false;
    })
})
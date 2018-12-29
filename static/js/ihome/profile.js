function showSuccessMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function(){
    $('#form-avatar').submit(function(e){
            e.preventDefault()
            $(this).ajaxSubmit({
                url: '/user/profile_image/',
                type: 'PATCH',
                dataType: 'json',
                success: function(data){
                    if(data.code == '200'){
                        $('#user-avatar').attr('src', '/static/media/'+ data.icon)
                    }
                },
                error:function(data){
                    alert('miss')
                }
            })
    })
})
$(document).ready(function(){
        $('#form-name').submit(function(e){
            e.preventDefault()
            $(this).ajaxSubmit({
                url: '/user/profile_name/',
                type: 'PATCH',
                dataType: 'json',
                success: function(data){
                  if(data.code == '200'){
                    $('#user-name').val(data.name)
                  }
                },
                error:function(data){
                    alert('no')
                }
            })
        })

})
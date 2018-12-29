function showSuccessMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

$(document).ready(function(){
    $('#form-auth').submit(function(e){
        e.preventDefault()
        $(this).ajaxSubmit({
            url:'/user/auth/',
            type:'POST',
            dataType: 'json',
            success:function(data){
                if(data.code == '200'){
                    $('#real-name').val(data.id_name)
                    $('#id-card').val(data.id_card)
                }
            },
            error:function(data){
                alert('wrong')
            }
        })
    })
})

$(document).ready(function(){
    $.ajax({
        url: '/user/id_name/',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.code == '200'){
                $('#real-name').val(data.id_name)
                $('#id-card').val(data.id_card)
                $('#id-card').attr('disabled', 'disabled')
                $('#ok').hide()
            }
        },
        error:function(data){
            alert('wrong!')
        }

    })
})
function logout() {
    $.ajax({
        url: '/user/logout/',
        type: 'GET',
        dataType: 'json',
        success:function(data){
            if(data.code == '200'){
                location.href = '/user/login/'
            }
        },
        error:function(data){
            alert('wrong!')
        }
    })
}



$(document).ready(function(){
        $.ajax({
            url: '/user/my_info/',
            type: 'get',
            dataType: 'json',
            success: function(data){
                $('#user-avatar').attr('src', '/static/media/' + data.icon)
                $('#user-name').text(data.name)
                $('#user-mobile').text(data.phone)
            },
            error: function(data){
                alert('wrong')
             }
        })
})


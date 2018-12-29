function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

var imageCodeId = "";

function generateUUID() {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function generateImageCode() {
    $.ajax({
        url:'/user/random_num/',
        type:'get',
        dataType:'json',
        success: function(data){
            $('#random_num').text(data.data)
        }
    })
}


$(document).ready(function() {
    generateImageCode();
    $("#mobile").focus(function(){
        $("#mobile-err").hide();
    });
    $("#imagecode").focus(function(){
        $("#image-code-err").hide();
    });
    $("#password").focus(function(){
        $("#password-err").hide();
        $("#password2-err").hide();
    });
    $("#password2").focus(function(){
        $("#password2-err").hide();
    });
    $('#register0').submit(function(e){
        e.preventDefault()
        var mobile = $('#mobile').val()
        var password = $('#password').val()
        var password2 = $('#password2').val()
        var imagecode = $('#random_num').text()

        $.ajax({
            url : '/user/register/',
            type: 'POST',
            dataType: 'json',
            data: {'mobile': mobile, 'password': password, 'password2': password2, 'imagecode': imagecode},
            success: function(data){
                if(data.code == '200'){
                    location.href = '/user/login/'
                }else if(data.code == '1001'){
                    $('#phone-code-err').text(data.msg).show()
                }
            },
            error: function(data){
                alert('注册失败')
            }
        })
    });
})



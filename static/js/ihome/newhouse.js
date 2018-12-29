function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function(){
    // $('.popup_con').fadeIn('fast');
    // $('.popup_con').fadeOut('fast');
})

$(document).ready(function(){
    $('#form-house-info').submit(function(e){
        e.preventDefault()
        $(this).ajaxSubmit({
            url: '/house/new_house/',
            type: 'POST',
            dataType: 'json',
            success: function(data){
                alert(data.code)
                if(data.code == '200'){
                    $('#form-house-image').show()
                    $('#form-house-info').hide()
                    $('#house-id').val(data.id)
                    }

                },
            error:function(e){
                alert('new_wrong')
            }
        })
    })
  })

$(document).ready(function(){
    $.ajax({
        url:'/house/area/',
        type:'GET',
        dataType: 'json',
        success:function(data){
            if(data.code == '200'){
                areas = data.data
                for(i=0; i<areas.length;i+=1){
                    area_list = '';
                    area_list += '<option>' + areas[i].name + '</option>'
                    $('#area-id').append(area_list)
                }
            }
        }
    })
})

$(document).ready(function(){
    $.ajax({
        url:'/house/facility_num/',
        type: 'GET',
        dataType: 'json',
        success: function(data){

            if(data.code == '200'){
                facilities = data.data
                for(i=0; i<facilities.length; i+=1){
                    facility_list = '';
                    facility_list += '<li> <div class="checkbox"> <label> <input type="checkbox" name="facility" value="'+  facilities[i].id +'">'+  facilities[i].name +'</label></div></li>'

                    $('.house-facility-list').append(facility_list)
                }
            }
        },
        error: function(data){
            alert('www')
           }
    })

})

$(document).ready(function(){
    alert('IK')
    $('#form-house-image').submit(function(e){
        e.preventDefault()
        var house_id = $('#house-id').val()
        alert(house_id)
        $(this).ajaxSubmit({
            url: '/house/house_images/',
            data: {'house_id': house_id},
            type: 'POST',
            dataType:'json',
            success:function(data){
                    alert('okkk')
            }
        })
    })
})


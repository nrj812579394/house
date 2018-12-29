$(document).ready(function(){
    $.ajax({
        url: '/house/user_h/',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.code == '200'){
                $(".auth-warn").hide();
                $('.new-house').show()
            }else if(data.code == '1010'){
                $(".auth-warn").show();
                $('.new-house').hide()
            }
        },
        error:function(data){
            alert('my_house_wrong!')
        }

    })
})

$(document).ready(function(){
        $.ajax({
            url: '/house/house_info/',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                if(data.code == '200'){
                    for(i=0; i<data.home_info.length; i+=1){
                        var house_li = '';
                        house_li += '<li><a href="/house/detail/?house_id=' + data.home_info[i].id + '"><div class="house-title">'
                        house_li += '<h3>房屋ID:'+ data.home_info[i].id +' —— ' + data.home_info[i].title + '</h3></div>'
                        house_li += '<div class="house-content">'
                        house_li += '<img src="/static/images/' + data.home_info[i].image + '" alt="">'
                        house_li += '<div class="house-text"><ul>'
                        house_li += '<li>位于：' + data.home_info[i].area + '</li>'
                        house_li += '<li>价格：￥' + data.home_info[i].price + '/晚</li>'
                        house_li += '<li>发布时间：' + data.home_info[i].create_time + '</li>'
                        house_li += '</ul></div></div></a></li>'
                        $('#houses-list').append(house_li)
                    }
                }

            },
        })

})




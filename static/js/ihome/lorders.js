//模态框居中的控制
function centerModals(){
    $('.modal').each(function(i){   //遍历每一个模态框
        var $clone = $(this).clone().css('display', 'block').appendTo('body');    
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top-30);  //修正原先已经有的30个像素
    });
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

$(document).ready(function(){
    $('.modal').on('show.bs.modal', centerModals);      //当模态框出现的时候
    $(window).on('resize', centerModals);
    $(".order-accept").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-accept").attr("order-id", orderId);
    });
    $(".order-reject").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-reject").attr("order-id", orderId);
    });
});

$(document).ready(function(){
    $.ajax({
        url: '/order/i_order_info/',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.code == '200'){
                for(i=0; i<data.data.length; i+=1){
                    div_list = ''
                    div_list += '<img src="/static/images/'+ data.data[i].image + '">'
                    div_list += '<div class="order-text">'
                    div_list += '<h3>'+ data.data[i].house_title + '</h3>'
                    div_list += '<ul>'
                    div_list += '<li>创建时间:'+ data.data[i].create_date + '</li>'
                    div_list += '<li>入住日期:'+ data.data[i].begin_date + '</li>'
                    div_list += '<li>离开日期:'+ data.data[i].end_date + '</li>'
                    div_list += '<li>合计金额:'+ data.data[i].amount + '(共'+ data.data[i].days +  '晚)</li>'
                    div_list += '<li>订单状态: <span>'+ data.data[i].status + '</span></li>'
                    div_list += '<li>客户评价:very good!</li>'
                    div_list += '</ul></div>'
                    $('.order-content').append(div_list)
                }

            }
        },
        error: function(data){
            alert('l.wrong')
        }
    })
})
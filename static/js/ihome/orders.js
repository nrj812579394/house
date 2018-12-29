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
    $(".order-comment").on("click", function(){
        var orderId = $(this).parents("li").attr("order-id");
        $(".modal-comment").attr("order-id", orderId);
    });
});


$(document).ready(function(){
    $.ajax({
        url: '/order/my_order_info/',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.code == 200){
                for(i=0; i<data.data.length; i+=1){
                      ui_list = '';
                      ui_list += '<h3>订单</h3>'
                      ui_list += '<ul>'
                      ui_list += '<li>创建时间:'+ data.data[i].begin_date + '</li>'
                      ui_list += '<li>入住日期:'+ data.data[i].begin_date + '</li>'
                      ui_list += '<li>离开日期:'+ data.data[i].end_date + '</li>'
                      ui_list += '<li>合计金额:'+ data.data[i].amount+ '(共'+ data.data[i].days + '晚)</li>'
                      ui_list += '<li>订单状态:'
                      ui_list += '<span>'+ data.data[i].status  +'</span>'
                      ui_list += '</li>'
                      ui_list += '<li>我的评价:'+ data.data[i].order_id+ '</li>'
                      ui_list += '<li>拒单原因:xxx</li>'
                      ui_list += '</ul>'
                      $('.order-text').append(ui_list)
                }
            }
        },
        error: function(data){

        }

    })

})
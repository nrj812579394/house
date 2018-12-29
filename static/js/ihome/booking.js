function hrefBack() {
    history.go(-1);
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

function decodeQuery(){
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

function showErrorMsg() {
    $('.popup_con').fadeIn('fast', function() {
        setTimeout(function(){
            $('.popup_con').fadeOut('fast',function(){}); 
        },1000) 
    });
}

$(document).ready(function(){
    $(".input-daterange").datepicker({
        format: "yyyy-mm-dd",
        startDate: "today",
        language: "zh-CN",
        autoclose: true
    });
    $(".input-daterange").on("changeDate", function(){
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();

        if (startDate && endDate && startDate > endDate) {
            showErrorMsg();
        } else {
            var sd = new Date(startDate);
            var ed = new Date(endDate);
            days = (ed - sd)/(1000*3600*24) + 1;
            var price = $(".house-text>p>span").html();
            var amount = days * parseFloat(price);
            $(".order-amount>span").html(amount.toFixed(2) + "(共"+ days +"晚)");
        }
    });
})

$(document).ready(function(){
    var id = location.href.split('=')[1]
    $.ajax({
        url: '/house/booking_house/' + id,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            alert('ok')
        },
        error:function(data){
            alert('booking_wrong')
        }
    })
})

$('.submit-btn').click(function(){
    var id = location.href.split('=')[1]
    var start = $('#start-date').val()
    var end = $('#end-date').val()
    $.ajax({
        url: '/order/orders/',
        type: 'POST',
        data: {'start': start, 'end': end, 'id': id},
        dataType: 'json',
        success: function(data){
            alert('order_ok')
        },
        error:function(data){
            alert('order_wrong')
        }
    })
})


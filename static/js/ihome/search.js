var cur_page = 1; // 当前页
var next_page = 1; // 下一页
var total_page = 1;  // 总页数
var house_data_querying = true;   // 是否正在向后台获取数据

// 解析url中的查询字符串
function decodeQuery(){
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

// 更新用户点选的筛选条件
function updateFilterDateDisplay() {
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var $filterDateTitle = $(".filter-title-bar>.filter-title").eq(0).children("span").eq(0);
    if (startDate) {
        var text = startDate.substr(5) + "/" + endDate.substr(5);
        $filterDateTitle.html(text);
    } else {
        $filterDateTitle.html("入住日期");
    }
}


// 更新房源列表信息
// action表示从后端请求的数据在前端的展示方式
// 默认采用追加方式
// action=renew 代表页面数据清空从新展示
function updateHouseData(action) {
    var areaId = $(".filter-area>li.active").attr("area-id");
    if (undefined == areaId) areaId = "";
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var sortKey = $(".filter-sort>li.active").attr("sort-key");
    var params = {
        aid:areaId,
        sd:startDate,
        ed:endDate,
        sk:sortKey,
        p:next_page
    };
    //发起ajax请求，获取数据，并显示在模板中
}

$(document).ready(function(){
    var queryData = decodeQuery();
    var startDate = queryData["sd"];
    var endDate = queryData["ed"];
    $("#start-date").val(startDate);
    $("#end-date").val(endDate);
    updateFilterDateDisplay();
    var areaName = queryData["aname"];
    if (!areaName) areaName = "位置区域";
    $(".filter-title-bar>.filter-title").eq(1).children("span").eq(0).html(areaName);

    $(".input-daterange").datepicker({
        format: "yyyy-mm-dd",
        startDate: "today",
        language: "zh-CN",
        autoclose: true
    });
    var $filterItem = $(".filter-item-bar>.filter-item");
    $(".filter-title-bar").on("click", ".filter-title", function(e){
        var index = $(this).index();
        if (!$filterItem.eq(index).hasClass("active")) {
            $(this).children("span").children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).siblings(".filter-title").children("span").children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $filterItem.eq(index).addClass("active").siblings(".filter-item").removeClass("active");
            $(".display-mask").show();
        } else {
            $(this).children("span").children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            $filterItem.eq(index).removeClass('active');
            $(".display-mask").hide();
            updateFilterDateDisplay();
        }
    });
    $(".display-mask").on("click", function(e) {
        $(this).hide();
        $filterItem.removeClass('active');
        updateFilterDateDisplay();
        cur_page = 1;
        next_page = 1;
        total_page = 1;
        updateHouseData("renew");

    });
    $(".filter-item-bar>.filter-area").on("click", "li", function(e) {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).siblings("li").removeClass("active");
            $(".filter-title-bar>.filter-title").eq(1).children("span").eq(0).html($(this).html());
        } else {
            $(this).removeClass("active");
            $(".filter-title-bar>.filter-title").eq(1).children("span").eq(0).html("位置区域");
        }
    });
    $(".filter-item-bar>.filter-sort").on("click", "li", function(e) {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).siblings("li").removeClass("active");
            $(".filter-title-bar>.filter-title").eq(2).children("span").eq(0).html($(this).html());
        }
    })
})

var aid = location.search.split('&')[0].split('=')[1]
var sd = location.search.split('&')[2].split('=')[1]
var ed = location.search.split('&')[3].split('=')[1]
    $.ajax({
        url: '/house/my_search/',
        dataType: 'json',
        type: 'GET',
        data:{'aid': aid, 'sd': sd, 'ed': ed},
        success: function(data){
            if(data.code == '1011'){
                alert(data.msg)
            }else if(data.code == '200'){
                for(i=0; i<data.data.length; i+=1){
                    li_list = ''
                    li_list += '<img src=/static/images/' + data.data[i].image + '/>'
                    li_list += '<div class="house-desc">'
                    li_list += '<div class="landlord-pic"><img src="/static/images/'+ data.data[i].image +'"></div>'
                    li_list += '<div class="house-price">￥<span>'+ data.data[i].price +'</span>/晚</div>'
                    li_list += '<div class="house-intro">'
                    li_list += '<span class="house-title">'+ data.data[i].title +'</span>'
                    li_list += '<em>出租'+ data.data[i].room +'间 - 1次入住 - 中关村软件园</em>'
                    li_list += '</div></div>'
                    $('.house-item').append(li_list)
                }

            }
        }
    })



$(document).ready(function(){
    $.ajax({
        url: '/house/s_areas/',
        type: 'GET',
        dataType:'json',
        success: function(data){
            if(data.code=='200'){
                for(i=0; i<data.data.length; i+=1){
                    a_list ='';
                    a_list += '<li area-id="'+ data.data[i].id + '">'+ data.data[i].name + '</li>'
                    $('.filter-area').append(a_list)
               }
            }
        },
        error: function(data){
            alert('s.wrong')
        }
    })
})
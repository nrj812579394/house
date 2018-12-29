function hrefBack() {
    history.go(-1);
}

function decodeQuery(){
    var search = decodeURI(document.location.search);
    return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
        values = item.split('=');
        result[values[0]] = values[1];
        return result;
    }, {});
}

$(document).ready(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
    })
    $(".book-house").show();
})

$(document).ready(function(){
    var id = location.href.split('=')[1]
        $.ajax({
            url: '/house/house_detail/' + id,
            type: 'GET',
            dataType: 'json',
            success: function(data){
                alert(data.booking)
                if(data.code == '200'){
                    var facilities = data.house.facilities;
                    for(i=0; i<facilities.length; i+=1){
                        f_list = '';
                        f_list += '<li>'+ facilities[i].name + '<li>'
                        $('.house-facility-list').append(f_list)
                    }
                    $('.book-house').attr('href', '/house/booking/?house_id='+ id)

                }

            },
            error:function(data){
                alert('detail_wrong')
            }

        })
})
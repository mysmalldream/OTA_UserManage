// 更多景区
$(function() {
  $.ajax({
    type: "get",
    url: common_api + "/user/more.action",
    dataType: "json",
    success: function(data) {
    //   console.log(data.data);
    //   console.log(data.data[0].images[0].url);
      var lis = "";
      for (var i = 0; i < data.data.length; i++) {
        lis +=
          '<li class="clearfix">' +
          '<img class="fl" src='+data.data[i].images[0].url+' alt="">' +
          '<div class="more_right fl">' +
          "<h3>"+data.data[i].name +
          '<span class="fr price">' +
          '¥<i>'+data.data[i].salePrice+'</i><span class="yellow">起</span></span>' +
          "</h3>" +
          "<p>景点: <i>"+data.data[i].viewName+"</i>" +
          '<span class="fr">' +
          '<a href="./order.html" class="button button-3d button-highlight button-pill button-small">预 定</a>' +
          "</span>" +
          "</p>" +
          '<div class="date">出发日期: <span class="yellow">'+data.data[i].startTime+'</span>' +
          '&nbsp;&nbsp;&nbsp;结束日期: <span class="yellow">'+data.data[i].endTime+'</span></div>' +
          "</div>" +
          "</li>";
      }
      $(".more").html(lis)
      // setInterval(function(){$(".more").html(lis);},3000)
    }
  });
});

// 更多产品
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// console.log(GetQueryString("id"));
if (window.sessionStorage["id"] == undefined) {
  window.location.href = "../index.html";
}
$(function() {
  // 搜索显示更多景区
  
  // 点击显示更多景区
  $.ajax({
    type: "get",
    url: common_api + "/user/productList.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      if (data.code === 0) {
        $(".more").html("亲,暂无数据了呢~");
      } else {
        var lis = "";
        for (var i = 0; i < data.data.length; i++) {
          lis +=
            '<li class="clearfix">' +
            '<img class="fl" src=' +
            data.data[i].images[0].url +
            ' alt="">' +
            '<div class="more_right fl">' +
            "<h3>" +
            data.data[i].name +
            '<span class="fr price">' +
            "¥<i>" +
            data.data[i].salePrice +
            '</i><span class="yellow">起</span></span>' +
            "</h3>" +
            "<p>景点: <i>" +
            data.data[i].viewName +
            "</i>" +
            '<span class="fr">' +
            "<a href=./order.html?id=" +
            data.data[i].id +
            ' class="button button-3d button-highlight button-pill button-small">预 定</a>' +
            "</span>" +
            "</p>" +
            '<div class="date">有效期开始: <span class="yellow">' +
            data.data[i].startTime +
            "</span>" +
            '&nbsp;&nbsp;&nbsp;有效期结束: <span class="yellow">' +
            data.data[i].endTime +
            "</span></div>" +
            "</div>" +
            "</li>";
        }
        $(".more").html(lis);
      }

      // setInterval(function(){$(".more").html(lis);},3000)
    }
  });
});

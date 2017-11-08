// 更多景区
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var numbers = GetQueryString("nameId");
// console.log(numbers);

$(function() {
  var urls = "";
  if (numbers == 1) {
    urls = "expeciallyView";
    $("#more").html("更多景区>特别推荐");
  } else if (numbers == 2) {
    urls = "viewTravalView";
    $("#more").html("更多景区>景点游");
  } else if (numbers == 3) {
    urls = "rimTravalView";
    $("#more").html("更多景区>周边游");
  } else if (numbers == 4) {
    urls = "nationalTravalView";
    $("#more").html("更多景区>国内游");
  }
  $.ajax({
    type: "get",
    url: common_api + "/user/" + urls + ".action",
    dataType: "json",
    success: function(data) {
      // console.log(data.data);
      var lis = "";
      for (var i = 0; i < data.data.length; i++) {
        // console.log(data.data[i].id);
        lis +=
          '<li class="item fl">' +
          "<a href=./details.html?id=" +
          data.data[i].id +
          ">" +
          "<img src=" +
          data.data[i].pic[0] +
          " alt=" +
          data.data[i].name +
          ">" +
          "</a>" +
          "<p>" +
          data.data[i].name +
          "</p>" +
          "</li>";
      }
      $(".contents").html(lis);
    }
  });
});

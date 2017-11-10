// 产品详情页
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// console.log(GetQueryString("id"));
// console.log(GetQueryString("id"));
if (window.sessionStorage["id"] == undefined) {
  window.location.href = "../index.html";
}

$(function() {
  $("#magnifier").magnifier(); //产品图片
  $(".spinnerExample").spinner({}); //预定人数
  // 日历
  $(".select").on("click", function() {
    $(".calendar-box")
      .stop(true, false)
      .slideToggle(500);
  });


  //客户满意度
  $(".agree>h1>i").html(Math.floor(Math.random() * 10) + 90);
  $(".agree>p>span").html(Math.floor(Math.random() * 100) + 20);

  // 产品详细数据
  $.ajax({
    type: "get",
    url: common_api + "/user/detailPro.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      // console.log(data.data.name);
      // console.log(data.data.calendar);

      var lis = "",dates;
       $(".calendar-box").calendar({
         ele: ".demo-box", //依附
         title: "请选择出发日期 : ",
         beginDate: "",
         endDate: "",
         data:  data.data.calendar,
        //  [
        //    { timeDate: "2017-11-01", price: "101" }, 
        //    { timeDate: "2017-11-02", price: "102" },
        //    { timeDate: "2017-11-03", price: "102" }],
       });
        $(".special_top3 h3").html(data.data.name);
        $("#salePrice").html(data.data.salePrice);
        $("#marketPrice").html(data.data.marketPrice);
      // for (var i = 0; i < data.data.images.length; i++) {
      lis +=
        '<div class="item active">' +
        "<img src=" +
        data.data.images[0].url +
        ' alt="...">' +
        "</div>" +
        '<div class="item">' +
        "<img src=" +
        data.data.images[1].url +
        ' alt="...">' +
        "</div>" +
        '<div class="item">' +
        "<img src=" +
        data.data.images[2].url +
        ' alt="...">' +
        "</div>";
      // }
      $(".carousel-inner").html(lis);
      $(".carousel").carousel({ interval: 2000 });
    }
  });
  $(".watch").on("click", function() {
    getActive();
  });
  $(".zhifubao").on("click", function() {
    getActive();
  });
    function getActive() {
      var data = $(".calendar-box").calendarGetActive();
      // console.log(data);
      $(".riqi").html(data.date);
    }
});

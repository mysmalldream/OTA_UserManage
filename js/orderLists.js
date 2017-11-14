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
  // 点击显示更多景区
  $.ajax({
    type: "get",
    url: common_api + "/user/stateOerder.action?cust_id=9&state=0",
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      if (data.code === 0) {
        $(".home").html("亲,暂无更多订单了哦~");
      } else {
        var lis = "",
          divs = "";
        for (var i = 0; i < data.data.length; i++) {
          lis +=
            "<li >" +
            '<img class="" src=' +
            data.data[i].images[0].url +
            ' alt="">' +
            '<div class="stateOerder  ">' +
            '<ul class="stateOerder_before">' +
            "<li>" +
            '<div class="createDate">' +
            '<b style="font-size:16px;">下单日期:' +
            '<span style="margin-right:15px;">' +
            data.data[i].createDate +
            "</span>订单号:" +
            "<span>" +
            data.data[i].orderId +
            "</span>" +
            "</b>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="productName">产品名称:' +
            "<span>" +
            data.data[i].productName +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="isPay">支付方式:' +
            "<span>" +
            data.data[i].ispay +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="status">状态:' +
            "<span>支付成功</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="unitPrice">总金额:¥' +
            "<span>" +
            data.data[i].price +
            "</span>元" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="number">数量:' +
            "<span>" +
            data.data[i].orderNumber +
            "</span>人" +
            '<input id="out_trade_nos" type="hidden"  value=' +
            data.data[i].orderId +
            ' style="border:1px solid red;">' +
            '<input id="ids" type="hidden"  value=' +
            data.data[i].id +
            ' style="border:1px solid red;">' +
            '<input id="total_fees" type="hidden"  value=' +
            data.data[i].price +
            ' style="border:1px solid red;">' +
            '<input id="refund_fees" type="hidden"  value=' +
            data.data[i].price +
            ' style="border:1px solid red;">' +
            '<button type="button" style="margin-right:50px;" class="btn btn-success btn-sm tuikuan fr" data-toggle="modal"data-target="#myModal" >退 款</button>' +
            "</div>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</li>";
        }
        $(".tab-pane_success").html(lis);
        $(".tuikuan").on("click", function() {
          var out_trade_noss = $(this)
            .parent()
            .find("#out_trade_nos")
            .val();
          var idss = $(this)
            .parent()
            .find("#ids")
            .val();
          var total_feess = $(this)
            .parent()
            .find("#total_fees")
            .val();
          var refund_feess = $(this)
            .parent()
            .find("#refund_fees")
            .val();
          swal(
            {
              title: "您确定要退款吗？",
              text: "退款后将无法恢复!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确 定",
              cancelButtonText: "取 消",
              showLoaderOnConfirm: true,
              closeOnConfirm: false
            },
            function() {
              $(".confirm").html("请 稍 等...");
              setTimeout(function(){ 
              $.ajax({
                type: "get",
                url:
                  common_api +
                  "/refundServlet?out_trade_no=" +
                  out_trade_noss +
                  "&id=" +
                  idss +
                  "&total_fee=" +
                  total_feess +
                  "&refund_fee=" +
                  refund_feess,
                dataType: "json",
                success: function(data) {
                  console.log(data);
                  if (data.code == 0) {
                    swal("退款失败", "该订单已过期，不能退款！", "error");
                  } else if (data.code == 1) {
                    swal(
                      {
                        title: "退款提交成功",
                        text: "退款中...请耐心等待3-5个工作日",
                        type: "success",
                        // showCancelButton: true,
                        confirmButtonColor: "#5ED2FF",
                        confirmButtonText: "确 定",
                        closeOnConfirm: false
                      },
                      function() {
                        $(".sweet-overlay").hide();
                        $(".sweet-alert").hide();
                        window.location.href = window.location.href;
                        $.ajax({
                          type: "get",
                          url:
                            common_api +
                            "/refundQueryServlet?out_trade_no=" +
                            data.out_trade_no,
                          dataType: "json",
                          success: function(data) {
                            console.log(data);
                            window.location.href = "./orderLists.html";
                          }
                        });
                      }
                    );
                  } else if (data.code == 2) {
                    swal("网络异常,请重试~", " ", "warning");
                  }
                }
              });
              }, 0);
            }
          );
        });
      }
    }
  });
});

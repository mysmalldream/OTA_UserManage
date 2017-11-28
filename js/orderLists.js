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
  // 已支付
  $.ajax({
    type: "get",
    url:
      common_api +
      "/user/stateOerder.action?userId=" +
      window.sessionStorage["id"] +
      "&state=0",
    dataType: "json",
    success: function(data) {
      console.log(data.data);
      if (data.code == 0) {
        $("#home").html("亲,暂无更多订单了哦~");
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
            '<div class="productName"> <b>【产品名称】</b>' +
            "<span>" +
            data.data[i].productName +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="isPay"><b>【支付方式】</b>' +
            "<span >" +
            data.data[i].ispay +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="status"><b>【状态】</b>' +
            "<span>支付成功</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="unitPrice"><b>【总金额 (¥)】</b>' +
            "<span>" +
            data.data[i].price +
            "</span>元" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="number"><b>【数量】</b>' +
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
            '<input id="ispays" type="hidden"  value=' +
            data.data[i].ispay +
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
          // console.log($(this).parent().find($('button')));
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
          var out_request_nos = Math.floor(Math.random() * 1000000000);
          var is_pays = $(this)
            .parent()
            .find("#ispays")
            .val();
          // console.log(out_trade_noss);
          // console.log(idss);
          // console.log(total_feess);
          // console.log(out_request_nos);
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
              // console.log($(this).parent()[0]);
              if (is_pays == "支付宝支付") {
                $.ajax({
                  //支付宝退款提交
                  type: "get",
                  url:
                    common_api +
                    "/alipayRefundServlet?out_trade_no=" +
                    out_trade_noss +
                    "&refund_amount=" +
                    total_feess +
                    "&id=" +
                    idss +
                    "&out_request_no=" +
                    out_request_nos,
                  dataType: "json",
                  success: function(data) {
                    console.log(data);
                    if (data.code == 0) {
                      swal("退款失败", "该订单已过期，不能退款！", "error");
                    } else if (data.code == 1) {
                      // var timer = setInterval(function(paams) {
                      //   console.log(1111);
                      //   $.ajax({    //支付宝退款主动查询
                      //     type: "get",
                      //     url:
                      //       common_api +
                      //       "/alipayRefundQueryServlet?out_request_no=" +
                      //       data.out_request_no +
                      //       "&out_trade_no=" +
                      //       data.out_trade_no +
                      //       "&id=" +
                      //       data.id,
                      //     dataType: "json",
                      //     success: function(data) {
                      //       console.log(data);
                      //       console.log(data.message);

                      //       setTimeout(() => {
                      //         if (data.message !== null) {
                      //           clearInterval(timer);
                      //         }
                      //       }, 5000);
                      //     }
                      //   });
                      // }, 1000);

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
                          $.ajax({
                            //支付宝退款主动查询
                            type: "get",
                            url:
                              common_api +
                              "/alipayRefundQueryServlet?out_request_no=" +
                              data.out_request_no +
                              "&out_trade_no=" +
                              data.out_trade_no +
                              "&id=" +
                              data.id,
                            dataType: "json",
                            success: function(data) {
                              console.log(data);
                              // console.log(data.message);
                            }
                          });
                          $(".sweet-overlay").hide();
                          $(".sweet-alert").hide();
                          window.location.href = window.location.href;
                        }
                      );
                    } else if (data.code == 2) {
                      swal(data.message, " ", "warning");
                    }
                  }
                });
              } else {
                $.ajax({
                  //微信退款提交
                  type: "get",
                  url:
                    common_api +
                    "/refundServlet?out_trade_no=" +
                    out_trade_noss +
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
                            //微信支付退款查询
                            type: "get",
                            url:
                              common_api +
                              "/refundQueryServlet?out_trade_no=" +
                              data.out_trade_no,
                            dataType: "json",
                            success: function(data) {
                              console.log(data);
                              // window.location.href = "./orderLists.html";
                            }
                          });
                        }
                      );
                    } else if (data.code == 2) {
                      swal(data.message, " ", "warning");
                    }
                  }
                });
              }
            }
          );
        });
      }
    }
  });
  //已退款
  $.ajax({
    type: "get",
    url:
      common_api +
      "/user/stateOerder.action?userId=" +
      window.sessionStorage["id"] +
      "&state=3",
    dataType: "json",
    success: function(data) {
      console.log(data);
      if (data.code == 0) {
        $("#ios").html("亲,暂无更多订单了哦~");
      } else {
        var lis = "";
        for (var i = 0; i < data.data.length; i++) {
          lis +=
            "<li>" +
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
            '<div class="productName"> <b>【产品名称】</b>' +
            "<span>" +
            data.data[i].productName +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="isPay"><b>【支付方式】</b>' +
            "<span>" +
            data.data[i].ispay +
            "</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="status"><b>【状态】</b>' +
            "<span>退款成功</span>" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="unitPrice"><b>【总金额 (¥)】</b>' +
            "<span>" +
            data.data[i].price +
            "</span>元" +
            "</div>" +
            "</li>" +
            "<li>" +
            '<div class="number"><b>【数量】</b>' +
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
            '<button type="button" style="margin-right:50px;" class="btn btn-warning btn-sm tuikuans fr" data-toggle="modal"data-target="#myModal" >删 除</button>' +
            "</div>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</li>";
        }
        $(".tab-pane_successqq").html(lis);
        $(".tuikuans").on("click", function() {
          var idss = $(this)
            .parent()
            .find("#ids")
            .val();
          // console.log(idss);
          swal(
            {
              title: "您确定要删除吗？",
              text: "删除后将无法恢复!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "确 定",
              cancelButtonText: "取 消",
              showLoaderOnConfirm: true,
              closeOnConfirm: false
            },
            function() {
              //删除回调一
              $(".confirm").html("请 稍 等...");
              setTimeout(function() {
                $.ajax({
                  type: "get",
                  url: common_api + "/user/deleteRefund.action?id=" + idss,
                  dataType: "json",
                  success: function(data) {
                    console.log(data);
                    if (data.code == 0) {
                      swal("删除失败,请重试~", "", "error");
                    } else if (data.code == 1) {
                      swal(
                        {
                          title: "删除成功",
                          text: "已删除~",
                          type: "success",
                          // showCancelButton: true,
                          confirmButtonColor: "#5ED2FF",
                          confirmButtonText: "确 定",
                          closeOnConfirm: false
                        },
                        function() {
                          //删除回调二
                          window.location.href = window.location.href;
                        }
                      );
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

// 产品详情页
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// console.log(GetQueryString("id"));
// console.log(window.sessionStorage["id"]);
if (window.sessionStorage["id"] == undefined) {
  window.location.href = "../index.html";
}

var productId;
$(function () {
  //退出
  $('#names').html(window.sessionStorage.getItem("userName"))
  $('#back').on('click', function () {
    window.sessionStorage.removeItem("userName")
    window.location.href = '../index.html';
  })


  $("#magnifier").magnifier(); //产品图片
  $(".spinnerExample").spinner({}); //预定人数
  // 日历
  $(".select").on("click", function () {
    $(".calendar-box")
      .stop(true, false)
      .slideToggle(500);
  });

  //客户满意度
  $(".custom>h1>i").html(Math.floor(Math.random() * 10) + 90);
  $(".custom>p>span").html(Math.floor(Math.random() * 100) + 50);

  // 产品详细数据
  $.ajax({
    type: "get",
    url: common_api + "/user/detailPro.action?id=" + GetQueryString("id"),
    dataType: "json",
    success: function (data) {
      console.log(data.data);
      console.log(data.data.calendar[0].price);
      $(".viewRemark").html(data.data.viewRemark);
      $(".costInside").html(data.data.costInside);
      $(".costOutside").html(data.data.costOutside);
      productId = data.data.id;
      var lis = "",
        dates;
      $(".calendar-box").calendar({
        ele: ".demo-box", //依附
        title: "请选择出发日期 : ",
        beginDate: "",
        endDate: "",
        data: data.data.calendar
      });
      $(".startTime").html(data.data.startTime);
      $(".endTime").html(data.data.endTime);
      $(".special_top3 h3").html(data.data.name);
      // $("#salePrice").html(data.data.salePrice);
      $("#salePrice").html(data.data.calendar[0].price);
      $("#marketPrice").html(data.data.marketPrice);
      // 轮播图
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
      // 支付验证
      $("#userName").on("change blur", function () {
        var pattern = /^[\u4e00-\u9fa5]*$/;
        if (!pattern.test($("#userName").val()) || $("#userName").val() == 0) {
          $(".fill1").html("姓名不能为空且必须为中文");
          $("#userName").val('');
        } else {
          $(".fill1").html("");
        }
      });

      $("#userPhone").on("change blur", function () {
        var pattern = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!pattern.test($("#userPhone").val())) {
          $(".fill2").html("手机号格式不合法");
          $("#userPhone").val('');
        } else {
          $(".fill2").html("");
        }
      });

      $("#idCard").on("change blur", function () {
        var pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!pattern.test($("#idCard").val())) {
          $(".fill3").html("身份证号格式不合法");
          $("#idCard").val('');
        } else {
          $(".fill3").html("");
        }
      });

      // 支付开始
      $(".pays").on("click", function () {
        // console.log($(".riqi").html());
        // console.log($("#userName").val());
        if ($("#userName").val().length == 0 || $("#userPhone").val().length == 0 || $("#idCard").val().length == 0) {   //判断信息是否完善
          alert("请补全相应信息")
        } else if ($(".riqi").html().length == 0) {
          alert("请返回选择出发日期")
        }
        else {
          // 订单使用日期的处理useDate
          var newD1, newD2, newD3, newOrder;
          newD1 = $(".riqi").html().split("-")[0];
          newD2 = $(".riqi").html().split("-")[1];
          newD3 = $(".riqi").html().split("-")[2];
          if (parseInt(newD2) < 10) {
            newD2 = "0" + newD2;
          } else {
            newD2;
          }
          if (parseInt(newD3) < 10) {
            newD3 = "0" + newD3;
          } else {
            newD3;
          }
          newOrder = newD1 + '-' + newD2 + '-' + newD3;
          console.log(newOrder);
          //订单创建日期的处理createDate
          var useD1, useD2, useD3, useOrder;
          useD1 = new Date().getFullYear();
          useD2 = new Date().getMonth() + 1;
          useD3 = new Date().getDate();
          if (useD2 < 10) {
            useD2 = '0' + useD2;
          } else {
            useD2;
          }
          if (useD3 < 10) {
            useD3 = '0' + useD3;
          } else {
            useD3;
          }
          useOrder = useD1 + "-" + useD2 + "-" + useD3;
          // 支付方式
          if ($("#zhifubao").is(":checked")) {
            ispay = "支付宝支付";
          } else {
            ispay = "微信支付";
          }

          var date = new Date();
          this.year = date.getFullYear();
          this.month = date.getMonth() + 1;
          this.date = date.getDate();
          this.hour =
            date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          this.minute =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          this.second =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
          var currentTime =
            this.year +
            "" +
            this.month +
            "" +
            this.date +
            "" +
            this.hour +
            "" +
            this.minute +
            "" +
            this.second;
          var orderId = currentTime + Math.floor(Math.random() * 1000000000);
          $('.pays').html('请 稍 候...')
          // console.log(parseFloat($(".spinnerExample").val()));
          // console.log(parseFloat($(".pics").html()));
          // console.log(($(".spinnerExample").val() * $(".pics").html()).toFixed(1));

          $.ajax({
            type: "get",
            url:
              common_api +
              "/user/addOrder.action?orderId=" +
              orderId +
              "&productId=" +
              data.data.id +
              "&productName=" +
              data.data.name +
              "&customId=" +
              data.data.customId +
              "&custName=" +
              data.data.customName +
              "&supplierId=" +
              data.data.supplierId +
              "&viewId=" +
              data.data.viewId +
              "&ispay=" +
              ispay +
              "&orderNumber=" +
              $(".spinnerExample").val() +
              "&unitPrice=" +
              $(".pics").html() +
              "&createDate=" +
              useOrder +
              "&price=" +
              ($(".spinnerExample").val() * $(".pics").html()).toFixed(1) +
              // $(".spinnerExample").val() * $(".pics").html() +
              "&useDate=" +
              // $(".riqi").html() +
              newOrder +
              "&userPhone=" +
              $("#userPhone").val() +
              "&userName=" +
              $("#userName").val() +
              "&idCard=" +
              $("#idCard").val() +
              "&remark=无" +
              // $("#remark").val() +
              "&userId=" +
              window.sessionStorage["id"],
            dataType: "json",
            success: function (data) {
              console.log(data);
              if (data.code == 1) {
                $(".modal-dialog").hide();
                $(".confirm").html("请 稍 候...");
                swal(
                  {
                    title: "请使用" + data.isPay+"扫码支付",
                    text: "恭喜!订单提交成功",
                    type: "success",
                    // showCancelButton: true,
                    confirmButtonColor: "#24E51A",
                    confirmButtonText: "查看订单状态",
                    closeOnConfirm: false,
                    imageUrl: data.path
                  },
                  function () {
                    //支付宝
                    if (data.isPay == "支付宝") {
                      $.ajax({
                        type: "get",
                        url:
                          common_api +
                          "/alipayQueryServlet?out_trade_no=" +
                          orderId,
                        success: function (data) {
                          console.log(data);
                          if (data.code == 1) {
                            swal(
                              {
                                title: data.message,
                                confirmButtonColor: "#87C8E9",
                                confirmButtonText: "确 定",
                                closeOnConfirm: false
                              },
                              function () {
                                $(".in").removeClass("modal-backdrop");
                                // $("#myModal").hide();
                                $(".sweet-alert").hide();
                                $(".sweet-overlay").hide();
                                window.location.href =
                                  window.location.href;
                              }
                            );
                          } else {
                            swal(
                              {
                                title: data.message,
                                confirmButtonColor: "#87C8E9",
                                confirmButtonText: "确 定",
                                closeOnConfirm: false
                              },
                              function () {
                                $(".in").removeClass("modal-backdrop");
                                $(".sweet-alert").hide();
                                $(".sweet-overlay").hide();
                                window.location.href =
                                  window.location.href;
                              }
                            );
                          }
                        }
                      });
                    } else {
                      //微信
                      $.ajax({
                        type: "get",
                        url:
                          common_api +
                          "/queryServlet?out_trade_no=" +
                          orderId,
                        success: function (data) {
                          console.log(data);
                          if (data.code == 1) {
                            swal(
                              {
                                title: data.message,
                                confirmButtonColor: "#87C8E9",
                                confirmButtonText: "确 定",
                                closeOnConfirm: false
                              },
                              function () {
                                $(".in").removeClass("modal-backdrop");
                                // $("#myModal").hide();
                                $(".sweet-alert").hide();
                                $(".sweet-overlay").hide();
                                window.location.href =
                                  window.location.href;
                                console.log(542365);
                              }
                            );
                          } else {
                            swal(
                              {
                                title: data.message,
                                confirmButtonColor: "#87C8E9",
                                confirmButtonText: "确 定",
                                closeOnConfirm: false
                              },
                              function () {
                                $(".in").removeClass("modal-backdrop");
                                $(".sweet-alert").hide();
                                $(".sweet-overlay").hide();
                                window.location.href =
                                  window.location.href;
                              }
                            );
                          }
                        }
                      });
                    }
                  }
                );
                // console.log(orderId);
              } else if (data.code == 0) {
                $(".modal-dialog").hide();
                // console.log(42342);
                // $('.pays').html(data.msg)
                swal(
                  {
                    title: "订单提交失败!",
                    text: data.msg,
                    confirmButtonColor: "#87C8E9",
                    confirmButtonText: "确 定",
                    closeOnConfirm: false
                  },
                  function () {
                    window.location.href = window.location.href;
                  }
                );
              }
            }
          });
        }
      });
    }
  });
  // $(".watch").on("click", function () {
  //   getActive();
  // });
  $(".zhifu").on("click", function () {
    getActive();
  });
  // 出发日期
  function getActive() {
    var data = $(".calendar-box").calendarGetActive();
    // console.log(data);
    // console.log(data.price);
    // $(".riqi").html(data.date);
    $(".pics").html(data.money);
    // $("#salePrice").html(data.money);
  }

});

// 登录页
$(function() {
  $("#exampleInputAmount1").on("change", function() {
    if ($("#exampleInputAmount1").val() == "") {
      $(".loginName").html("* 用户名不能为空");
    } else {
      $(".loginName").html("");
    }
  });
  $("#exampleInputAmount2").on("change", function() {
    if ($("#exampleInputAmount2").val() == "") {
      $(".password").html("* 密码不能为空");
      $(".tijiao").html("* 用户名或密码不能为空");
    } else {
      $(".password").html("");
      $(".tijiao").html("");
    }
  });
  $("#tijiao").on("click", function() {
    var obj = {
      url: common_api+"/user/login.action", 
      type: "post", 
      dataType: "json",
      success: function(data) {
        console.log(data);
        if (data.code === 1) {
          // alert("恭喜,登陆成功,点击确定去往首页页面~"); userName
          // console.log(data.data)
          window.sessionStorage["id"] = JSON.stringify(data.data.id);
          window.sessionStorage["userName"] = (data.data.userName);
          window.location.href = "./page/homepage.html";
        } else {
          $(".tijiao").html("用户名或密码错误");
          alert(data.msg);
        }
      }
    };
    if (
      $("#exampleInputAmount1").val() == "" ||
      $("#exampleInputAmount2").val() == ""
    ) {
      $(".tijiao").html("* 用户名或密码不能为空");
    } else {
      $(".tijiao").html("");
      $("#login").ajaxSubmit(obj)      //提交表单数据
      // {
        // alert(453254);
        // return false;
        // console.log(obj);
        // if (data.code === 1) {
        //   // alert("恭喜,登陆成功,点击确定去往首页页面~");
        //   // console.log(data.data.id)
        //   window.sessionStorage["id"] = JSON.stringify(data.data.id);
        //   window.location.href = "./page/homepage.html";
        // } else {
        //   $(".tijiao").html("用户名或密码错误");
        //   alert(data.msg);
        // }
      // });
      // return false;
      }
  });
});

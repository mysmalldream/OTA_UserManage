// 个人分销商注册

$(function() {
 
  $("#userName").keyup(function() {
    // console.log($('#userName').val())
    $.ajax({
      type: "get",
      url:
        common_api +
        "custom/checkUserName.action?userName=" +
        $("#userName").val(),
      dataType: "json",
      success: function(data) {
        console.log(data.msg);
        if (data.code == 0) {
          $(".userName1").html(data.msg);
        } else {
          $(".userName1").html("");
        }
      }
    });
  });

  $("#name").on("change blur", function() {
    if ($("#name").val() == "") {
      $(".name").html("✘ 此项不能为空");
    } else {
      $(".name").html("");
    }
  });
  $("#userName").on("change blur", function() {
    if ($("#userName").val() == "") {
      $(".userName").html("✘ 此项不能为空");
    } else {
      $(".userName").html("");
    }
  });
  $("#mobilePhone").on("change blur", function() {
    if ($("#mobilePhone").val() == "") {
      $(".mobilePhone").html("✘ 此项不能为空");
    } else {
      $(".mobilePhone").html("");
    }
  });
  $("#qq").on("change blur", function() {
    if ($("#qq").val() == "") {
      $(".qq").html("✘ 此项不能为空");
    } else {
      $(".qq").html("");
    }
  });
  $("#password").on("change blur", function() {
    if ($("#password").val() == "") {
      $(".password").html("✘ 此项不能为空");
    } else {
      $(".password").html("");
    }
  });
  $("#password1").on("change blur", function() {
    if ($("#password1").val() == "") {
      $(".password2").html("✘ 两次输入的密码不一致");
    } else {
      $(".password2").html("");
    }
  });
    $("#password1").on("change blur", function() {
      if ($("#password").val() == $("#password1").val()) {
        $(".password1").html("");
      } else {
        $(".password1").html("✘ 两次输入的密码不一致");
      }
    });
  $("#address").on("change blur", function() {
    if ($("#address").val() == "") {
      $(".address").html("✘ 此项不能为空");
    } else {
      $(".address").html("");
    }
  });
  $("#linkMan").on("change blur", function() {
    if ($("#linkMan").val() == "") {
      $(".linkMan").html("✘ 此项不能为空");
    } else {
      $(".linkMan").html("");
    }
  });
  $("#phone").on("change blur", function() {
    if ($("#phone").val() == "") {
      $(".phone").html("✘ 此项不能为空");
    } else {
      $(".phone").html("");
    }
  });

  $("#tijiao").on("click", function() {
    if ($("#name").val() == "") {
      alert("姓名不能为空");
    } else if ($("#userName").val() == "") {
      alert("用户名不能为空");
    } else if ($("#mobilePhone").val() == "") {
      alert("手机号不能为空");
    } else if ($("#qq").val() == "") {
      alert("QQ号不能为空");
    } else if ($("#password").val() == "") {
      alert("密码不能为空");
    } else if ($("#address").val() == "") {
      alert("地址不能为空");
    } else if ($("#linkMan").val() == "") {
      alert("紧急联系人姓名不能为空");
    } else if ($("#phone").val() == "") {
      alert("紧急联系人手机号不能为空");
    } else if($("#agrees").is(":checked")){
      $(".people").html("");
      $("#personal").ajaxSubmit(function() {
         swal("恭喜,注册成功!", "3s后自动返回登录页面~", "success");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 3000);
      });
    }else{
       $(".people").html("请勾选");
    }
  });
});

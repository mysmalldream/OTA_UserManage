// 找回密码

$(function() {

 $('.demo-3').click(function () {
   $.gDialog.confirm('<input type="text" class="form-control forget" autofocus="autofocus"  name="userName" required id="userName" placeholder="请输入您的用户名"><div class="userName" style="color:red"></div><input type="number" class="form-control forget" name="mobilePhone" required id="mobilePhone" placeholder="请输入11位手机号码"><div class="mobilePhone" style="color:red"></div><input type="number" class="forget" style="border: 1px solid #ccc;height:34px;margin-right:10px;text-indent: 10px;"  name="yzm" required id="yzm" placeholder="请输入获取到的验证码"><input id="btnSendCode" class="forget send" type="button" value="获取验证码" onClick="getNumber()" /><input type="password" class="form-control forget send" name="password" onBlur="mima()" required id="password" placeholder="请设置您的新密码"><div class="password" style="color:red"></div><input type="password" class="form-control forget" name="password1" onBlur="mima()" required id="password1" placeholder="请再次输入新密码"><div class="password1" style="color:red"></div>', {
     title: "找 回 密 码",
     animateIn: "bounceInDown",
     animateOut: "bounceOutUp"
   });
 });
  
});

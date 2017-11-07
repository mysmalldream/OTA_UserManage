// 产品详情页
$(function() {
  $("#magnifier").magnifier(); //产品图片
  $(".spinnerExample").spinner({}); //预定人数
  // 日历
  $(".select").on("click", function() {
    $(".calendar-box")
      .stop(true, false)
      .slideToggle(500);
  });
  //获取出发日期
  $(".calendar-box").calendar({
    ele: ".demo-box", //依附
    title: "请选择出发日期 : ",
    beginDate: "2017-11-08",
    endDate: "2017-12-04",
    data: [
      { date: "2017-11-01", data: "101" },
      { date: "2017-11-02", data: "102" },
      { date: "2017-11-03", data: "103" },
      { date: "2017-11-04", data: "104" },
      { date: "2017-11-05", data: "105" },
      { date: "2017-11-06", data: "106" },
      { date: "2017-11-07", data: "107" },
      { date: "2017-11-08", data: "108" },
      { date: "2017-11-09", data: "109" },
      { date: "2017-11-10", data: "110" },
      { date: "2017-11-11", data: "111" },
      { date: "2017-11-12", data: "112" },
      { date: "2017-11-13", data: "113" },
      { date: "2017-11-14", data: "114" },
      { date: "2017-11-15", data: "115" },
      { date: "2017-11-16", data: "116" },
      { date: "2017-11-17", data: "117" },
      { date: "2017-11-18", data: "118" },
      { date: "2017-11-19", data: "119" },
      { date: "2017-11-20", data: "120" },
      { date: "2017-11-21", data: "121" },
      { date: "2017-11-22", data: "122" },
      { date: "2017-11-23", data: "123" },
      { date: "2017-11-24", data: "124" },
      { date: "2017-11-25", data: "125" },
      { date: "2017-11-26", data: "126" },
      { date: "2017-11-27", data: "127" },
      { date: "2017-11-28", data: "128" },
      { date: "2017-11-29", data: "129" },
      { date: "2017-11-30", data: "130" },
      { date: "2017-12-01", data: "121" },
      { date: "2017-12-02", data: "122" },
      { date: "2017-12-03", data: "123" },
      { date: "2017-12-04", data: "124" }
    ]
  });
  $(".watch").on('click',function(){
    getActive()
    
  })
  $(".zhifubao").on('click',function(){
    getActive()
    console.log($('.spinnerExample').val())
  })
  
  function getActive() {
    var data = $(".calendar-box").calendarGetActive();
    console.log(data);
    $('#riqi').html(data.date)
  }
  //客户满意度
  $('.agree>h1>i').html(Math.floor(Math.random()*10)+90)
  $('.agree>p>span').html(Math.floor(Math.random()*100)+20)



});

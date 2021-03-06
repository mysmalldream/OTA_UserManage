// 首页
$(function(jq) {
  // console.log( window.sessionStorage["id"]);
  if ((window.sessionStorage["id"] == undefined)) {
    window.location.href = "../index.html";
  }
  // console.log(window.sessionStorage.getItem("userName"));
  $('#names').html(window.sessionStorage.getItem("userName"))
  $('#back').on('click',function () {
    window.sessionStorage.removeItem("userName")
    window.location.href = '../index.html';
  })
  //搜索下拉模糊匹配
  $("#keyWord").on('keyup',function () {
    // console.log($('#keyWord').val())
    var lis='',lens;
    $.ajax({
      type: "get",
      url:
        common_api +
        "/user/search.action?keyWord=" +
        $("#keyWord").val(),
      dataType: "json",
      success: function (data) {
        // console.log(data);
        if (data.code == 0) {
          // console.log(111);
        } else {
          if (data.data.length>=5){
            lens=5;
          }else{
            lens = data.data.length;  
          }
          for (var i = 0; i < lens;i++){
            lis +='<li>'+data.data[i].name+'</li>';
          }
          $('.sels').html(lis);
        }
        $('.sels>li').click(function () {
            // console.log($(this).html());
          $('#keyWord').val($(this).html());
        })
      }
    });
  });
  //搜索
  $(".search").on('click',function () {
    window.location.href = './search.html?keyWord=' + $('#keyWord').val()
    
    // $.ajax({
    //   type: "get",
    //   url: common_api + "/user/search.action?keyWord=" + keyWord,
    //   dataType: "json",
    //   success: function (data) {
    //     console.log(data);
    //     if(data.code==0){
    //       // window.location.href = './search.html'
    //       $('.more').html(data.msg)
    //     }else {
    //       // window.location.href='./search.html'
    //     }
    //   }})
  })
  var imgs;
  //   轮播图
  $.ajax({
    type: "get",
    url: common_api + "/user/scope.action",
    dataType: "json",
    success: function(data) {
      // console.log(data);
      // console.log(data.data[0].id);
      imgs = data.data[0].images;
      var posterTvGrid = function(o, options, data) {
        this.parent = jq("#" + o);
        this.body = jq("body");
        if (this.parent.length <= 0) {
          return false;
        }

        this.options = jq.extend({}, posterTvGrid.options, options);
        if (typeof data !== "object") return false;

        this.data = data || {};
        this.reset();
        //处理页面resize
        var _this = this;
        jq(window).resize(function() {
          _this.reset();
        });
      };
      posterTvGrid.prototype = {
        reset: function(options) {
          if (typeof options == "object") {
            jq.extend(this.options, options);
          }
          if (
            parseInt(this.body.outerWidth()) > 1255 ||
            navigator.userAgent.indexOf("iPad") !== -1
          ) {
            this.options.width = 1366;
          } else {
            this.options.width = 970;
          }
          this.total = this.data.length;
          this.pageNow = this.options.initPage;
          this.preLeft = 0;
          this.nextLeft = this.options.width - 530;
          this.preNLeft = -530;
          this.nextNLeft = this.options.width;
          this.pageNowLeft = (this.options.width - 1000) / 2;
          this.drawContent();
        },
        drawContent: function() {
          this.parent.empty();
          this.parent.css({
            width: this.options.width + "px",
            height: this.options.height + "px",
            position: "relative"
          });
          this.content = document.createElement("DIV");
          this.content.className = this.options.className;
          this.content.cssText =
            "width:" +
            this.options.width +
            "px;height:" +
            this.options.height +
            "px;cursor:move;position:absolute;";
          this.bottomNav = document.createElement("DIV");
          this.bottomNav.className = "bottomNav";
          for (var i = 1; i <= this.total; i++) {
            var bottomItem = document.createElement("DIV");
            bottomItem.className = "bottomNavButtonOFF";
            if (i == this.pageNow) {
              bottomItem.className = "bottomNavButtonOFF bottomNavButtonON";
            }
            bottomItem.setAttribute("ref", i);
            this.bottomNav.appendChild(bottomItem);
          }
          this.content.appendChild(this.bottomNav);
          this.bannerControls =
            '<div class="bannerControls"> <div class="leftNav" style="display: block;"></div> <div class="rightNav" style="display: block;"></div> </div>';
          this.content.innerHTML += this.bannerControls;

          this.contentHolder = document.createElement("DIV");
          this.contentHolder.style.width = this.options.width + "px";
          this.contentHolder.style.height = this.options.height + "px";

          for (
            var item = 0, i = 1, l = this.data.length;
            item < l;
            ++item, ++i
          ) {
            var contentHolderUnit = document.createElement("DIV");
            contentHolderUnit.className = "contentHolderUnit";
            contentHolderUnit.setAttribute("ref", i);
            contentHolderUnit.setAttribute("id", "contentHolderUnit" + i);
            // var unitItem = '<a href="'+this.data[item].url+'" target="_blank" class="elementLink">';
            var unitItem = '<a href=./order.html?id='+data.data[0].id+'>';
            // unitItem += "</a>";
            unitItem +=
              '<img src="' +
              this.data[item].url +
              '" alt="' +
              this.data[item].name +
              '"/>';
              
            unitItem += '<span class="elementOverlay"></span>';
            unitItem += '<span class="leftShadow"></span>';
            unitItem += '<span class="rightShadow"></span>';
            unitItem += "</a>";
            
            contentHolderUnit.innerHTML = unitItem;
            this.contentHolder.appendChild(contentHolderUnit);
          }
          this.content.appendChild(this.contentHolder);
          this.parent.append(this.content);
          this.parent.css({ overflow: "hidden" });
          this.initContent();
          this.bind();
          this.start();
        },
        initContent: function() {
          contentHolderUnit = this.parent.find(".contentHolderUnit");
          contentHolderUnit.css({
            width: "0px",
            height: "0px",
            opacity: 0,
            left: this.options.width / 2 + "px",
            zIndex: 0,
            marginTop: "135px"
          });
          this.parent
            .find(".contentHolderUnit:nth-child(" + this.pageNow + ")")
            .css({
              width: "1000px",
              height: "350px",
              opacity: 1,
              left: this.pageNowLeft + "px",
              zIndex: 3,
              marginTop: 0
            });
          this.parent
            .find(
              ".contentHolderUnit:nth-child(" +
                this.pageNow +
                ") .elementOverlay"
            )
            .css({ opacity: 0 });
          this.parent
            .find(
              ".contentHolderUnit:nth-child(" + this.pageNow + ") .leftShadow"
            )
            .css({ opacity: 1 });
          this.parent
            .find(
              ".contentHolderUnit:nth-child(" + this.pageNow + ") .rightShadow"
            )
            .css({ opacity: 1 });

          var pre = this.pageNow > 1 ? this.pageNow - 1 : this.total;
          var next = this.pageNow == this.total ? 1 : this.pageNow + 1;
          this.parent.find(".contentHolderUnit:nth-child(" + pre + ")").css({
            opacity: 1,
            left: this.preLeft + "px",
            height: "260px",
            width: "530px",
            zIndex: 0,
            marginTop: "23px"
          });
          this.parent
            .find(".contentHolderUnit:nth-child(" + pre + ") .elementOverlay")
            .css({ opacity: 0.4 });
          this.parent
            .find(".contentHolderUnit:nth-child(" + pre + ") .leftShadow")
            .css({ opacity: 0 });
          this.parent
            .find(".contentHolderUnit:nth-child(" + pre + ") .rightShadow")
            .css({ opacity: 0 });

          this.parent.find(".contentHolderUnit:nth-child(" + next + ")").css({
            opacity: 1,
            left: this.nextLeft + "px",
            height: "260px",
            width: "530px",
            zIndex: 0,
            marginTop: "23px"
          });
          this.parent
            .find(".contentHolderUnit:nth-child(" + next + ") .elementOverlay")
            .css({ opacity: 0.4 });
          this.parent
            .find(".contentHolderUnit:nth-child(" + next + ") .leftShadow")
            .css({ opacity: 0 });
          this.parent
            .find(".contentHolderUnit:nth-child(" + next + ") .rightShadow")
            .css({ opacity: 0 });
        },
        bind: function() {
          this.leftNav = this.parent.find(".leftNav");
          this.rightNav = this.parent.find(".rightNav");
          this.bottonNav = this.parent.find(".bottomNavButtonOFF");
          this.lists = this.parent.find(".contentHolderUnit");
          var _this = this;
          this.parent.mouseover(function() {
            _this.stop();
            _this.leftNav.show();
            _this.rightNav.show();
          });
          this.parent.mouseout(function() {
            _this.start();
            //_this.leftNav.hide();
            //_this.rightNav.hide();
          });

          _this.leftNav.click(function() {
            _this.turn("right");
          });
          _this.rightNav.click(function() {
            _this.turn("left");
          });
          _this.bottonNav.click(function() {
            var ref = parseInt(this.getAttribute("ref"));
            if (_this.pageNow == ref) return false;

            if (_this.pageNow < ref) {
              var rightAbs = ref - _this.pageNow;
              var leftAbs = _this.pageNow + _this.total - ref;
            } else {
              var rightAbs = _this.total - _this.pageNow + ref;
              var leftAbs = _this.pageNow - ref;
            }
            if (leftAbs < rightAbs) {
              dir = "right";
            } else {
              dir = "left";
            }

            _this.turnpage(ref, dir);
            return false;
          });

          _this.lists.click(function(e) {
            var ref = parseInt(this.getAttribute("ref"));
            if (_this.pageNow == ref) {
              return true;
            } else {
              e.preventDefault();
            }
            if (_this.pageNow < ref) {
              var rightAbs = ref - _this.pageNow;
              var leftAbs = _this.pageNow + _this.total - ref;
            } else {
              var rightAbs = _this.total - _this.pageNow + ref;
              var leftAbs = _this.pageNow - ref;
            }
            if (leftAbs < rightAbs) {
              dir = "right";
            } else {
              dir = "left";
            }
            _this.turnpage(ref, dir);
          });
        },
        initBottomNav: function() {
          this.parent
            .find(".bottomNavButtonOFF")
            .removeClass("bottomNavButtonON");
          this.parent
            .find(".bottomNavButtonOFF:nth-child(" + this.pageNow + ")")
            .addClass("bottomNavButtonON");
        },
        start: function() {
          var _this = this;
          if (_this.timerId) _this.stop();
          _this.timerId = setInterval(function() {
            if (_this.options.direct == "left") {
              _this.turn("left");
            } else {
              _this.turn("right");
            }
          }, _this.options.delay);
        },
        stop: function() {
          clearInterval(this.timerId);
        },
        turn: function(dir) {
          var _this = this;

          if (dir == "right") {
            var page = _this.pageNow - 1;
            if (page <= 0) page = _this.total;
          } else {
            var page = _this.pageNow + 1;
            if (page > _this.total) page = 1;
          }
          _this.turnpage(page, dir);
        },
        turnpage: function(page, dir) {
          var _this = this;
          if (_this.locked) return false;
          _this.locked = true;
          if (_this.pageNow == page) return false;

          var run = function(page, dir, t) {
            var pre = page > 1 ? page - 1 : _this.total;
            var next = page == _this.total ? 1 : page + 1;
            var preP = pre - 1 >= 1 ? pre - 1 : _this.total;
            var nextN = next + 1 > _this.total ? 1 : next + 1;
            if (pre != _this.pageNow && next != _this.pageNow) {
              var nowpre = _this.pageNow > 1 ? _this.pageNow - 1 : _this.total;
              var nownext =
                _this.pageNow == _this.total ? 1 : _this.pageNow + 1;
              _this.parent
                .find(".contentHolderUnit:nth-child(" + nowpre + ")")
                .animate(
                  {
                    width: "0px",
                    height: "0px",
                    opacity: 0,
                    left: _this.options.width / 2 + "px",
                    zIndex: 0,
                    marginTop: "135px"
                  },
                  t
                );
              _this.parent
                .find(".contentHolderUnit:nth-child(" + _this.pageNow + ")")
                .animate(
                  {
                    width: "0px",
                    height: "0px",
                    opacity: 0,
                    left: _this.options.width / 2 + "px",
                    zIndex: 0,
                    marginTop: "135px"
                  },
                  t
                );
              _this.parent
                .find(".contentHolderUnit:nth-child(" + nownext + ")")
                .animate(
                  {
                    width: "0px",
                    height: "0px",
                    opacity: 0,
                    left: _this.options.width / 2 + "px",
                    zIndex: 0,
                    marginTop: "135px"
                  },
                  t
                );
            }
            if (dir == "left") {
              _this.parent
                .find(".contentHolderUnit:nth-child(" + _this.pageNow + ")")
                .css({ zIndex: 0 });

              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + pre + ") .elementOverlay"
                )
                .css({ opacity: 0.4 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.preLeft + "px",
                    height: "260px",
                    width: "530px",
                    zIndex: 2,
                    marginTop: "23px"
                  },
                  t
                );
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ") .leftShadow")
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ") .rightShadow")
                .css({ opacity: 0 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ")")
                .css({ zIndex: 3 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.pageNowLeft + "px",
                    height: "350px",
                    width: "1000px",
                    zIndex: 3,
                    marginTop: "0"
                  },
                  t
                );
              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + page + ") .elementOverlay"
                )
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ") .leftShadow")
                .css({ opacity: 1 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ") .rightShadow")
                .css({ opacity: 1 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ")")
                .css({
                  opacity: 0,
                  left: _this.nextNLeft + "px",
                  height: "100px",
                  width: "530px",
                  zIndex: 2,
                  marginTop: "85px"
                });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.nextLeft + "px",
                    height: "260px",
                    width: "530px",
                    zIndex: 2,
                    marginTop: "23px"
                  },
                  t
                );
              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + next + ") .elementOverlay"
                )
                .css({ opacity: 0.4 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ") .leftShadow")
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ") .rightShadow")
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + preP + ")")
                .css({ zIndex: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + preP + ")")
                .animate(
                  {
                    width: "530px",
                    height: "100px",
                    opacity: 0,
                    left: _this.preNLeft + "px",
                    zIndex: 0,
                    marginTop: "85px"
                  },
                  t,
                  "",
                  function() {
                    _this.locked = false;
                  }
                );
            } else {
              _this.parent
                .find(".contentHolderUnit:nth-child(" + _this.pageNow + ")")
                .css({ zIndex: 0 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ")")
                .css({ zIndex: 2 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.nextLeft + "px",
                    height: "260px",
                    width: "530px",
                    zIndex: 2,
                    marginTop: "23px"
                  },
                  t
                );
              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + next + ") .elementOverlay"
                )
                .css({ opacity: 0.4 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ") .leftShadow")
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + next + ") .rightShadow")
                .css({ opacity: 0 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ")")
                .css({ zIndex: 3 }, t);
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.pageNowLeft + "px",
                    height: "350px",
                    width: "1000px",
                    zIndex: 3,
                    marginTop: "0px"
                  },
                  t
                );
              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + page + ") .elementOverlay"
                )
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ") .leftShadow")
                .css({ opacity: 1 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + page + ") .rightShadow")
                .css({ opacity: 1 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ")")
                .css({
                  opacity: 0,
                  left: _this.preNLeft + "px",
                  height: "100px",
                  width: "530px",
                  zIndex: 2,
                  marginTop: "85px"
                });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ")")
                .animate(
                  {
                    opacity: 1,
                    left: _this.preLeft + "px",
                    height: "260px",
                    width: "530px",
                    zIndex: 2,
                    marginTop: "23px"
                  },
                  t
                );
              _this.parent
                .find(
                  ".contentHolderUnit:nth-child(" + pre + ") .elementOverlay"
                )
                .css({ opacity: 0.4 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ") .leftShadow")
                .css({ opacity: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + pre + ") .rightShadow")
                .css({ opacity: 0 });

              _this.parent
                .find(".contentHolderUnit:nth-child(" + nextN + ")")
                .css({ zIndex: 0 });
              _this.parent
                .find(".contentHolderUnit:nth-child(" + nextN + ")")
                .animate(
                  {
                    width: "530px",
                    height: "100px",
                    opacity: 0,
                    left: _this.nextNLeft + "px",
                    zIndex: 0,
                    marginTop: "85px"
                  },
                  t,
                  "",
                  function() {
                    _this.locked = false;
                  }
                );
            }

            _this.pageNow = page;
            _this.initBottomNav();
          };

          run(page, dir, _this.options.speed);
        }
      };

      posterTvGrid.options = {   //轮播图参数
        offsetPages: 3, //默认可视最大条数
        direct: "left", //滚动的方向
        initPage: 1, //默认当前显示第几条
        className: "posterTvGrid", //最外层样式
        autoWidth: true, //默认不用设置宽
        width: 970, //最外层宽，需要使用的时候在传,默认由程序自动判断
        height: 310, //最外层高
        delay: 2000, //滚动间隔（毫秒）
        speed: 500 //滚动速度毫秒
      };

      window.posterTvGrid = posterTvGrid;
      var posterTvGrid = new posterTvGrid(
        "posterTvGrid",
        { className: "posterTvGrid" },
        imgs
      );
    }
  });
  //   特别推荐
  $.ajax({
    type: "get",
    url: common_api + "/user/expeciallyView.action",
    dataType: "json",
    success: function(data) {
      var special_left, special_center, special_right_top, special_right_bottom;
      console.log(data.data);
      console.log(data.data[3].pic);
      special_left =
        "<a href=./details.html?id=" +
        data.data[0].id +
        ">" +
        "<img src=" +
        data.data[0].pic[0] +
        " title=" +
        data.data[0].name +
        ">" +
        '<div class="special_titles">' +
        "<span>" +
        "<i>" +
        data.data[0].name +
        "</i>" +
        "</span>" +
        // '<b class="fr">￥' +
        // "<em>" +
        // data.data[0].salePrice +
        // "</em>元/人</b>" +
        "</div>" +
        "</a>";
      $(".special_left").html(special_left);
      special_center =
        "<a href=./details.html?id=" +
        data.data[1].id +
        ">" +
        "<img src=" +
        data.data[1].pic[1] +
        " title=" +
        data.data[1].name +
        ">" +
        '<div class="special_titles">' +
        "<span>" +
        "<i>" +
        data.data[1].name +
        "</i>" +
        "</span>" +
        // '<b class="fr">￥' +
        // "<em>" +
        // data.data[1].salePrice +
        // "</em>元/人</b>" +
        "</div>" +
        "</a>";
      $(".special_center").html(special_center);
      special_right_top =
        "<a href=./details.html?id=" +
        data.data[2].id +
        ">" +
        "<img src=" +
        data.data[2].pic[2] +
        "  title=" +
        data.data[2].name +
        ">" +
        '<div class="special_titles">' +
        "<span>" +
        "<i>" +
        data.data[2].name +
        "</i>" +
        "</span>" +
        // '<b class="fr">￥' +
        // "<em>" +
        // data.data[2].salePrice +
        // "</em>元/人</b>" +
        "</div>" +
        "</a>";
      $(".special_right_top").html(special_right_top);
      special_right_bottom =
        "<a href=./details.html?id=" +
        data.data[3].id +
        ">" +
        "<img src=" +
        data.data[3].pic[3] +
        "  title=" +
        data.data[3].name +
        ">" +
        '<div class="special_titles">' +
        "<span>" +
        "<i>" +
        data.data[3].name +
        "</i>" +
        "</span>" +
        // '<b class="fr">￥' +
        // "<em>" +
        // data.data[3].salePrice +
        // "</em>元/人</b>" +
        "</div>" +
        "</a>";
      $(".special_right_bottom").html(special_right_bottom);
    }
  });
  //   景点游
  $.ajax({
    type: "get",
    url: common_api + "/user/viewTravalView.action",
    dataType: "json",
    success: function(data) {
      // console.log(data.data)
      var viewTraval_top='',
        viewTraval_bottom='';
      for (var i = 0; i < 4; i++) {
        // console.log(data.data[i])
        viewTraval_top +=
          "<li>" +
          "<a href=./details.html?id=" +
          data.data[i].id +
          ">" +
          "<img src=" +data.data[i].pic[0] +' title='+data.data[i].name+'>' +
          "<h5>"+data.data[i].name+"</h5>" +
          "</a>" +
          "</li>";
      }
      $(".viewTraval_top").html(viewTraval_top);
      // console.log(data.data[i].id)
      for (var j = 4; j < 8; j++) {
        viewTraval_bottom +=
          "<li>" +
          "<a href=./details.html?id=" +
          data.data[j].id +
          ">" +
          "<img src=" +data.data[j].pic[0] +' title='+data.data[j].name+'>' +
          "<h5>"+data.data[j].name+"</h5>" +
          "</a>" +
          "</li>";
      }
      $(".viewTraval_bottom").html(viewTraval_bottom);
    }
  });
  // //   周边游
  $.ajax({
    type: "get",
    url: common_api + "/user/rimTravalView.action",
    dataType: "json",
    success: function(data) {
      console.log(data.data)
      var rimTraval_top='',
      rimTraval_bottom='';
      // console.log(data.data);
      for (var i = 0; i < 4; i++) {
        rimTraval_top +=
          "<li>" +
          "<a href=./details.html?id=" +
          data.data[i].id +
          ">" +
          "<img src=" +data.data[i].pic[0] +' title='+data.data[i].name+'>' +
          "<h5>"+data.data[i].name+"</h5>" +
          "</a>" +
          "</li>";
      }
      $(".rimTraval_top").html(rimTraval_top);
      for (var j = 4; j < 8; j++) {
        rimTraval_bottom +=
          "<li>" +
          "<a href=./details.html?id=" +
          data.data[j].id +
          ">" +
          "<img src=" +data.data[j].pic[0] +' title='+data.data[j].name+'>' +
          "<h5>"+data.data[j].name+"</h5>" +
          "</a>" +
          "</li>";
      }
      $(".rimTraval_bottom").html(rimTraval_bottom);
    }
  });
  // //   国内游
  $.ajax({
    type: "get",
    url: common_api + "/user/nationalTravalView.action",
    dataType: "json",
    success: function(data) {
      var nationalTraval_top='',
      nationalTraval_bottom='';
      // console.log(data.data);
      for (var i = 0; i < 4; i++) {
        // console.log(data.data[i])
        nationalTraval_top +=
          "<li>" +
          "<a href=./details.html?id=" +
          data.data[i].id +
          ">" +
          "<img src=" +data.data[i].pic[0] +' title='+data.data[i].name+'>' +
          "<h5>"+data.data[i].name+"</h5>" +
          "</a>" +
          "</li>";
      }
      $(".nationalTraval_top").html(nationalTraval_top);
    }
  });
});

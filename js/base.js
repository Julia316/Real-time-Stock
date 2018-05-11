/**
 * 非空验证
 * @param {校验的值} value 
 * @returns 
 */
function NullEmpty(value) {
  if (value.replace(/(^\s*)|(\s*$)/g, "") == "") {
    return true
  } else {
    return false
  }
}

/**
 * 手机好吗格式校验
 * @param {校验的值} value 
 * @returns 
 */
function checkMobile(value) {
  if (!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(value))) {
    return true;
  } else {
    return false;
  }
}

/**
 * PlaceHolder兼容处理
 */
function PlaceHolder() {};
PlaceHolder.prototype = {
  // 判断兼容
  ability: function () {
    var input = document.createElement('input');
    return "placeholder" in input
  },
  // placeholder表单兼容处理(不包括密码表单)
  // 接收唯一参数 => obj:需要兼容的表单元素
  handling: function (obj) {
    if (true) {
      obj.each(function (index, ele) {
        // 给表单添加value属性，值为placeholder的值
        $(ele).attr({
          value: $(ele).attr("placeholder")
        })
        // 获取焦点/失去焦点
        $(ele).focus(function () {
          if ($(ele).val() == $(ele).attr("placeholder")) {
            $(ele).attr({
              value: ""
            });
          };
        }).blur(function () {
          if ($(ele).val() == "") {
            $(ele).attr({
              value: $(ele).attr("placeholder")
            });
          }
        })
      })

    }

  },
}

/**
 * 获取股票数据，在全局暴露一个Scock_info接收股票代码信息
 * @param {股票代码渲染的元素} gpcode_dom 
 * @param {指定股票代码} default_number 
 */
function Stock_find(gpcode_dom, default_number) {
  // 如果有传指定股票代码，则渲染指定股票
if (default_number) {
    createHtml(default_number, gpcode_dom);
} else if (!Href_data("k")) {
    // 如果没传指定股票代码，且k为空,则渲染默认股票
    createHtml("000002", gpcode_dom); // 原来是000002
} else {
    // 调用java后台
    s_data.getKeywordName(function (r_data) {
      if (r_data.status == "Success") {
        createHtml(r_data.data, gpcode_dom);
      }
    }, function () {
      // Java后台查询不到在调用php后台接口查询
      L("sendGp", {
        k: Href_data("k")
      }, function (data) {
        // 如果php后台数据中查询不到，则调java后台接口查询
        if (data.msg == "error") {
          createHtml("", gpcode_dom); // 默认  原来是000002
        } else {
          createHtml(data.result.gp, gpcode_dom);
        }
      })
    });

  }
  // 获取URL的传参值
  function Href_data(key) {
    var Href_Array = window.location.search.slice(1).split("&")
    var obj = {};
    for (var i = 0, b = Href_Array.length; i < b; i++) {
      var Key = Href_Array[i].split("=")
      obj[Key[0]] = Key[1]
    }
    return obj[key]
  }
  // 页面渲染代码
  function apply() {
    // 输出过滤器
    function filter(value) {
      var txt = "未有数据"
      if (!isNaN(value) && value !== "") {
        txt = value
      }
      return txt
    }
    // 股票名字
    $(".gpname").html(Stock_info.name)
    // 股票指数00
    $(".items-10").html(Stock_info["10"])
    // 股票指数01
    $(".items-264648").html(filter(parseFloat((Stock_info["264648"])).toFixed(2)))
    // 股票指数02  
    $(".items-199112").html(filter(parseFloat((Stock_info["199112"])).toFixed(2)) + "%")
    // 今开
    $(".items-7").html(filter(parseFloat((Stock_info["7"])).toFixed(2)))
    // 昨收
    $(".items-6").html(filter(parseFloat((Stock_info["6"])).toFixed(2)))
    // 成交量
    $(".items-13").html(filter((parseFloat((Stock_info["13"])) / 10000).toFixed(2)) + "万")
    // 换手率
    $(".items-1968584").html(filter(parseFloat((Stock_info["1968584"])).toFixed(2)) + "%")
    // 最高
    $(".items-8").html(Stock_info["8"])
    // 最低
    $(".items-9").html(Stock_info["9"])
    // 涨停
    $(".items-69").html(Stock_info["69"])
    // 跌停
    $(".items-70").html(Stock_info["70"])
    // 成交额
    $(".items-19").html(filter((parseFloat((Stock_info["19"])) / 100000000).toFixed(2)) + "亿")
    // 振幅
    $(".items-526792").html(filter(parseFloat((Stock_info["526792"])).toFixed(2)) + "%")
    // 流通市值
    $(".items-3475914").html(filter((parseFloat((Stock_info["3475914"])) / 100000000).toFixed(2)) + "亿")
    // 总市值
    $(".items-3541450").html(filter((parseFloat((Stock_info["3541450"])) / 100000000).toFixed(2)) + "亿")
    // 市盈率（动）
    $(".items-2034120").html(filter(parseFloat((Stock_info["2034120"])).toFixed(2)))
    // 市净率（动）
    $(".items-592920").html(filter(parseFloat((Stock_info["592920"])).toFixed(2)))
    if (parseFloat(Stock_info["264648"]) < 0) {
      $(".items-10,.items-199112,.items-264648").css("color", "#1dbf60")
    } else {
      $(".items-10,.items-199112,.items-264648").css("color", "#EC401E")
    }
  }
  // 数据获取，页面渲染
  function createHtml(Stock_number, gpcode_dom) {
    // 动态渲染股票数据
    gpcode_dom.html("(" + Stock_number + ")")
    // 创建获取数据的函数
    var getStock = document.getElementById("stockFunction")
    getStock.text = "function quotebridge_v2_realhead_hs_" + Stock_number + "_last (data) {" + "Stock_info = data.items;" + apply + "apply()}"
    // 创建跨域标签
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "http://d.10jqka.com.cn/v2/realhead/hs_" + Stock_number + "/last.js?" + Math.random() 
    $("head").append(script)
    setTimeout(function () {
      script.parentNode.removeChild(script);
      getStock.text = ""
    }, 5000)
    setInterval(function () {
      // 创建获取数据的函数
      var getStock = document.createElement("script")
      getStock.text = "function quotebridge_v2_realhead_hs_" + Stock_number + "_last (data) {" + "Stock_info = data.items;" + apply + "apply()}"
      // 创建跨域标签
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.src = "http://d.10jqka.com.cn/v2/realhead/hs_" + Stock_number + "/last.js?" + Math.random()
      $("head").append(script)
      setTimeout(function () {
        script.parentNode.removeChild(script);
        getStock.text = ""
      }, 5000)
    }, 60000)
  }
}

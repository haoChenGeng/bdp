var Options = {
  title: {
    text: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    bottom: '1px'
  },
  toolbox: {
    show: false
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '18%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    data: [120, 132, 101, 134, 90, 230, 210]
  }, {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    data: [120, 132, 101, 134, 190, 230, 210]
  }, {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    data: [120, 132, 101, 134, 90, 200, 210]
  }, {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    data: [120, 132, 201, 134, 90, 230, 210]
  }, {
    name: '搜索引擎',
    type: 'line',
    stack: '总量',
    data: [120, 182, 101, 134, 90, 230, 210]
  }]
};

var zxtotalColumn_option = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '-15%',
    right: '0',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['成交', '净流入', '待收', '充提差', '新客'],
    axisLabel: {
      textStyle: {
        color: '#666',
        fontSize: 10,
      }
    },
    axisTick: {
      show: false,
      alignWithLabel: false
    }
  }],
  yAxis: [{
    type: 'value',
    show: false,
  }],
  series: {
    name: '总额度',
    type: 'bar',
    barWidth: '60%',
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#000',
          fontStyle: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 15,
        },
      },
    },
    data: [{
      value: 100,
      itemStyle: {
        normal: {
          color: '#8958C6',
        }
      }
    }, {
      value: 60,
      itemStyle: {
        normal: {
          color: '#CF6250',
        }
      }
    }, {
      value: 153,
      itemStyle: {
        normal: {
          color: '#E9C962',
        }
      }
    }, {
      value: 10,
      itemStyle: {
        normal: {
          color: '#92A032',
        }
      }
    }, {
      value: 50,
      itemStyle: {
        normal: {
          color: '#64AF9E',
        }
      }
    }]
  }
};

 
var host = {
  env: 'test',
  test: {
    host: 'http://10.17.2.94:9050/decision-report-web/'
  },
  dev: {
    host: 'http://127.0.0.1:8020/bdp/mock/'
  },
  pro: {
    host: ''
  }
};

var getConfig = function() {
  switch (host.env) {
    case "dev":
      return host.dev;
      break;
    case "test":
      return host.test;
      break;
    case "pro":
      return host.pro;
      break;
    default:
      break;
  }
};


var getAuthority = function(url) {
  var b = getConfig();
  var code = localStorage.getItem("code");
  mui.ajax(b.host+'wechat/user/vertify' + '?code=' + code,{
    data: {
      // code: code
    },
    dataType: 'json',
    type: 'get',
    async: false,
    success: function(res) {
      if (res.code === 0) {
        mui.alert(res.data.token);
        localStorage.setItem('token',res.data.token);
      }else {
        mui.alert(res.msg);
      }
    },
    error: function(xhr) {
      mui.alert('请求错误！');
    }
  });
};

var getData = function(host, param) {
  var a;
  var b = getConfig();
  var token = localStorage.getItem('token');
  mui.ajax(b.host + host, {
    data: {
      auth: false,
      datDt: param,
      token: token
    },
    dataType: 'json',
    async: false,
    type: 'get',
    success: function(res) {
      if (res.code === 0) {
        if (res.data !== null) {

        }
        a = res.data;
      } else {
        mui.alert(res.msg);
      }
    },
    error: function(xhr,type,errorThrown) {
      console.log(xhr);
      mui.alert('请求错误，请稍后重试');
    }
  });
  return a;
};

var getInfoData = function(host,datDt,companyType,commentType) {
  var a;
  var b = getConfig();
  // var c = 'mgoiflctaf4ie';
  var token = localStorage.getItem('token');
  

  mui.ajax(b.host + host, {
    data: {
      auth: false,
      datDt: datDt,
      companyType: companyType,
      commentType: commentType,
      token: token
    },
    dataType: 'json',
    async: false,
    type: 'get',
    success: function(res) {
      if (res.code === 0) {
        a = res.data;
      } else {
        mui.alert(res.msg);
      }
    },
    fail: function(xhr,type,errorThrown) {
      mui.alert('请求错误，请稍后重试');
    }
  });
  return a;
};

var postComment = function(host,data,commentType,companyType) {
  var b = getConfig();
  // var token = localStorage.getItem('token');
  var token = 'mgoiflctaf4ie'; 

  mui.ajax(b.host + host + '?token=' + token, {
    data: {
      commentDesc: data,
      companyType: companyType,
      commentType: commentType
    },
    dataType: 'json',
    type: 'post',
    success: function(res) {
      refreshComment(res);      
    },
    fail: function() {
      mui.alert('请求错误，请稍后重试');
    },
  });
};


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

var getArticle = function(host, type,page,size) {
  var a;
  var b = getConfig();
  var token = localStorage.getItem('token');
  mui.ajax(b.host + host, {
    data: {
      type: type || 0,
      page:page||1,
      size:size||20,
      token: token
    },
    dataType: 'json',
    async: false,
    type: 'get',
    success: function(res) {
      if (res.code === 0) {
        a = res.data;
      } else {
        mui.alert(res.msg);
      }
    },
    fail: function() {
      mui.alert('请求错误，请稍后重试');
    }
  });
  return a;
};

function marqueeWord(marquee) {
  var offset = 0;
  var scrollHeight = marquee.offsetHeight;
  if (marquee.children[0]) {
    var firstNode = marquee.children[0].cloneNode(true);
    marquee.appendChild(firstNode);
  }else {

    return;
  }

  marquee.style = '';
  setInterval(function() {
    if (offset === scrollHeight) {
      offset = 0;
    }
    marquee.style.marginTop = '-' + offset + 'px';
    offset += 1;
  }, 100);
}

function clone(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate() - 1,                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S+": this.getMilliseconds()             //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)){
      if(k == "y+"){
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
};

function articleInfo(content, title, vcreateDate, username) {
  content = escape(content);
  title = escape(title);
  vcreateDate = escape(vcreateDate);
  username = escape(username);
  var myurl = 'news-report.html?content=' + content + '&title=' + title+'&vcreateDate='+vcreateDate+'&username='+username;
  window.location.href = myurl;
}

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

if (!isWeixinBrowser()) {
  // window.location.href = 'http://10.10.17.249:8020/bdp/forbidden.html';
} 

function getUnit(num) {
  if (!isNaN(parseInt(num))) {
    if (num >= 100000000 || num <= -100000000) {
      return (num/100000000).toFixed(2) + '亿';
    }else if ((num >= 10000 && num < 100000000) || (num <= -10000 && num > -100000000)) {
      return (num/10000).toFixed(2) + '万';
    }else {
      return num;
    }
  }else {
console.log('不是数字');
  return num;
  }
}

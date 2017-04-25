var _echart_width=$(document.body).width();

var newDate = new Date();
var date = newDate.Format('yyyy-MM-dd');

var allUrl = 'operate/xcf/all';
var infoUrl = 'common/configRuleAndComment';
var yjfxUrl = 'operate/zx/annualizedCoefficient';
var qyfxUrl = 'operate/xcf/region';
var hyqsUrl = 'operate/xcf/userTrend';
var kjtzUrl = 'operate/xcf/avgInvAmt';
var ftfxUrl = 'operate/xcf/reInv';
var yjjzdUrl = 'operate/xcf/pro';
var byljUrl = 'operate/xcf/regionAnalysis';

var opYjfxDay = clone(Options);
var opYjfxMon = clone(Options);
var opQyfxDay = clone(Options);
var opQyfxMon = clone(Options);
var opBylj = clone(Options);

var opHyqs = clone(Options);
var opKjtz = clone(Options);
var opFtfx = clone(Options);

var opYjjzd = clone(Options);

getInfo();
getXcfAll();
getYjfxChart();
getBylj();
getQyfx();
getYjjzd();
getFtfx();
getKjtz();
getHyqs();


var com3 = document.getElementById('writeComment');
com3.addEventListener('tap', function(e) {
  e.detail.gesture.preventDefault();
  var btnArray = ['取消', '确定'];
  mui.prompt('请输入备注','批示','评论',btnArray,function(e) {
    if (e.index == 1) {
      if (e.value !== null && e.value !== "") {
        postComment('common/comment',e.value,'运营详情','新财富');
      }
    }else {
console.log(1);
    }
  });
});

function refreshComment(res) {
  if (res.code === 0 ) {
    mui.toast('评论成功!');
    getInfo(infoUrl);
  }else {
    mui.alert(res.msg);
  }
}


/**
 * 业绩集中度
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getYjjzd() {
	var yjjzd = getData(yjjzdUrl,date);
  if (yjjzd.length) {
    opYjjzd.series.splice(0,opYjjzd.series.length);
    opYjjzd.legend.data = [];
    opYjjzd.xAxis.data.splice(0,opYjjzd.xAxis.data.length);
    opYjjzd.title.text = '';
    opYjjzd.grid.bottom = '20%';
    for (var i = 0; i < yjjzd.length; i++) {    
      opYjjzd.legend.data[i] = yjjzd[i].productName.trim();
      var item = {};
      item.data = [];
      item.name = yjjzd[i].productName.trim();
      item.type = 'line';
      for (var j = 0; j < yjjzd[i].list.length; j++) {
        item.data[j] = (yjjzd[i].list[j].amountRate*100).toFixed(2);
      }
      opYjjzd.series.push(item);
    }
    for (var k = 0; k < yjjzd[0].list.length; k++) {
      opYjjzd.xAxis.data[k] = yjjzd[0].list[k].datDt;
    }
    opYjjzd.yAxis.axisLabel = {};
    opYjjzd.yAxis.axisLabel.formatter = '{value}%';

    $("#achieTable").css({
      height: '280px',
      width: _echart_width
    });
    var chart1 = echarts.init(document.getElementById('achieTable'));
    chart1.resize();
    chart1.setOption(opYjjzd);    
  }
}


/**
 * 复投分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getFtfx() {
	var ftfx = getData(ftfxUrl,date);
	opFtfx.series.splice(0, opFtfx.series.length);
  opFtfx.legend.data.splice(0, opFtfx.legend.data.length);
  opFtfx.title.text = '';
  opFtfx.xAxis.data.splice(0,opFtfx.xAxis.data.length);
  opFtfx.legend.data.push('复投用户数','复投占比率');
  opFtfx.yAxis = [
  	{
  		type: 'value',
  		name: '复投用户数',
  		// max: 500,
  		position: 'left',
  		
  	},
  	{
  		type: 'value',
  		name: '复投占比率',
      min: 0,
  		max: 100,
      axisLabel: {
        formatter: '{value}%'
      },
  		position: 'right'
  	}
  ];
  var a = {
  	name: '复投用户数',
  	type: 'bar',
  	stack: '总量',
  	label: {
  		nomal: {
  			show: true,
  			position: 'top'
  		}
  	},
  	data: []
  };
  var b = {
  	name: '复投占比率',
  	type: 'line',
  	stack: '总量',
  	label: {
  		normal: {
  			show: true,
        formatter: '{c}%'        
  		}
  	},
  	data: []
  };
  for (var i = 0; i < ftfx.fuTouYongHuShu.length; i++) {
    a.data[i] = ftfx.fuTouYongHuShu[i].num;
    opFtfx.xAxis.data[i] = ftfx.fuTouYongHuShu[i].datDt;
  }

  for (var j = 0; j < ftfx['fuTouZhanBiLu:'].length; j++) {
  	b.data[j] = (ftfx['fuTouZhanBiLu:'][j].num*100).toFixed(2);
  }
  opFtfx.series.push(a,b);

  $("#againanalysisTable").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('againanalysisTable'));
  chart1.resize();
  chart1.setOption(opFtfx);
}


/**
 * 客均投资
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getKjtz() {
	var kjtz = getData(kjtzUrl,date);
  if (kjtz) {
  	opKjtz.series.splice(0, opKjtz.series.length);
    opKjtz.legend.data.splice(0, opKjtz.legend.data.length);
    opKjtz.title.text = '';
    opKjtz.legend.data.push('平均每用户投资金额(百万)');
    opKjtz.tooltip.axisPointer.type = 'shadow';
    opKjtz.xAxis.data.splice(0,opKjtz.xAxis.data.length);

    var a = {};
    a.data = [];
    a.name = '平均每用户投资金额(百万)';
    a.type = 'bar';
    a.barWidth = '50%';
    a.barGap = '5%';
    a.label = {};
    a.label.normal = {};
    a.label.normal.show = true;
    a.label.normal.position = 'top';
    for (var i = 0; i < kjtz.length; i++) {
      a.data[i] = kjtz[i].amt;
      opKjtz.xAxis.data[i] = kjtz[i].datDt;
    }
    opKjtz.series.push(a);    
  }

  $("#memberaverageTable").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('memberaverageTable'));
  chart1.resize();
  chart1.setOption(opKjtz);

}


/**
 * 会员趋势
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getHyqs() {
	var hyqs = getData(hyqsUrl,date);
  if (hyqs) {
	opHyqs.series.splice(0, opHyqs.series.length);
  opHyqs.legend.data.splice(0, opHyqs.legend.data.length);
  opHyqs.title.text = '';
  opHyqs.xAxis.data.splice(0,opHyqs.xAxis.data.length);
  opHyqs.legend.data.push('会员趋势');
  var a = {};
  a.data = [];
  for (var i = 0; i < hyqs.length; i++) {
    a.data[i] = hyqs[i].numCustomerAll;
    opHyqs.xAxis.data[i] = hyqs[i].datDt;
  }
  a.name = '会员趋势';
  a.type = 'line';
  a.stack = '总量';
  a.areaStyle = {};
  a.areaStyle.normal = {};
  a.label = {};
  a.label.normal = {};
  a.label.normal.show = true;
  opHyqs.series.push(a);    
  }

  $("#membertrendTable").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('membertrendTable'));
  chart1.resize();
  chart1.setOption(opHyqs);

}


/**
 * 区域分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getQyfx() {
	var qyfx = getData(qyfxUrl,date);
	var dataQyfxDay = qyfx.ri;
	var dataQyfxMon = qyfx.yue;

  if (dataQyfxDay) {
  	getYjfx(opQyfxDay,dataQyfxDay);    
  }
  if (dataQyfxMon) {
  	getYjfx(opQyfxMon,dataQyfxMon);    
  }

  $("#qyfxDay").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('qyfxDay'));
  chart1.resize();
  chart1.setOption(opQyfxDay);

  $("#qyfxMon").css({
    height: '280px',
    width: _echart_width
  });
  var chart2 = echarts.init(document.getElementById('qyfxMon'));
  chart2.resize();
  chart2.setOption(opQyfxMon);
}


/**
 * 本月累计
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getBylj() {
  var bylj = getData(byljUrl,date);
  if (bylj) {
    opBylj.series.splice(0, opBylj.series.length);
    opBylj.legend.data.splice(0, opBylj.legend.data.length);
    opBylj.title.text = '';
    opBylj.xAxis.data.splice(0,opBylj.xAxis.data.length);
    opBylj.legend.data.push('区域规模业绩总额(亿元)');
    opBylj.tooltip.trigger = 'axis';
    opBylj.tooltip.axisPointer = {};
    opBylj.tooltip.axisPointer.type = 'shadow';

    var a = {};
    a.data = [];
    a.name = '区域规模业绩总额(亿元)';
    a.type = 'bar';
    a.barWidth = '20%';
    a.barGap = 0;
    a.barCategoryGap = '5%';
    a.label = {};
    a.label.normal = {};
    a.label.normal.show = true;
    a.label.normal.position = 'top';
    for (var i = 0; i < bylj.length; i++) {
      opBylj.xAxis.data[i] = bylj[i].regionName;
      a.data[i] = bylj[i].amt;
    }
    opBylj.series.push(a);
  }

  $("#byljDay").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('byljDay'));
  chart1.resize();
  chart1.setOption(opBylj);

  $("#byljMon").css({
    height: '280px',
    width: _echart_width
  });
  var chart2 = echarts.init(document.getElementById('byljMon'));
  chart2.resize();
  chart2.setOption(opBylj);
}


/**
 * 业绩分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getYjfxChart() {
	var yjfx = getData(yjfxUrl,date);
	var dataYjfxDay = yjfx.ri;
	var dataYjfxMon = yjfx.yue;

	getYjfx(opYjfxDay,dataYjfxDay);    
	getYjfx(opYjfxMon,dataYjfxMon);    

  $("#yjfxDay").css({
    height: '280px',
    width: _echart_width
  });
  var chart1 = echarts.init(document.getElementById('yjfxDay'));
  chart1.resize();
  chart1.setOption(opYjfxDay);

  $("#yjfxMon").css({
    height: '280px',
    width: _echart_width
  });
  var chart2 = echarts.init(document.getElementById('yjfxMon'));
  chart2.resize();
  chart2.setOption(opYjfxMon);
}

function getYjfx(op,data) {
	op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.xAxis.data.splice(0,op.xAxis.data.length);
  op.legend.data.push('年化系数','成交金额','年化金额');
  var nhxs = {};
  var nhje = {};
  var cjje = {};
  nhxs.data = [];
  nhje.data = [];
  cjje.data = [];
  if (data.nianHuaXiShu) {
    for (var i = 0; i < data.nianHuaXiShu.length; i++) {
      nhxs.data[i] = (data.nianHuaXiShu[i].annualizedCoefficient.amt*100).toFixed(2);
      op.xAxis.data[i] = data.nianHuaXiShu[i].annualizedCoefficient.datDt;
    }    
  }
  if (data.chengJiaoJinE) {
    for (var i = 0; i < data.chengJiaoJinE.length; i++) {
      cjje.data[i] = data.chengJiaoJinE[i].annualizedCoefficient.amt;
    }    
  }
  if (data.nianHuaJinE) {
    for (var i = 0; i < data.nianHuaJinE.length; i++) {
      nhje.data[i] = data.nianHuaJinE[i].annualizedCoefficient.amt;
    }    
  }
  op.yAxis = [
    {
      name: '年化金额，成交金额',
      type: 'value',
      axisLabel: {
        formatter: function(value,index) {
          return getUnit(value);
        }
      }
    },
    {
      name: '年化系数',
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
      // max: 1
    }
  ];
  nhxs.name = '年化系数';
  nhxs.type = 'line';
  nhxs.yAxisIndex = 1;
  nhxs.animation = false;
  nhje.name = '年化金额';
  nhje.type = 'line';
  cjje.name = '成交金额';
  cjje.type = 'line';
  op.series.push(nhxs,nhje,cjje);
}


/**
 * 数据总览
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getXcfAll() {
	var all = getData(allUrl,date);
  if (all) {
  	document.getElementById('cj').innerHTML = all.vamountCj;
  	document.getElementById('jlr').innerHTML = all.vamountJlr;
  	document.getElementById('ctc').innerHTML = all.vamountCtc;
  	document.getElementById('ds').innerHTML = all.vamountDs;
  	document.getElementById('xk').innerHTML = all.vnumNewCustomer;    
  }
}

/**
 * 信息提示
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getInfo() {
  var info = getInfoData(infoUrl,date,'新财富','运营详情');
  var comment = [];
  var warn = [];
  var light = [];
  for (var i = 0; i < info.warningList.length; i++) {
    warn[i] = info.warningList[i].ruleId + '、' + info.warningList[i].ruleDesc;
  }
  for (var i = info.highlightList.length - 1; i >= 0; i--) {
    light[i] = info.highlightList[i].ruleId + '、' + info.highlightList[i].ruleDesc;
  }
  for (var i = info.commentList.length - 1; i >= 0; i--) {
    comment[i] = info.commentList[i].id + '、' + info.commentList[i].commentDesc + "<span class='marqueeMarkLi'>"+info.commentList[i].comName+'</span>';
  }

  var warnList = document.createDocumentFragment();
  var lightList = document.createDocumentFragment();
  var commentList = document.createDocumentFragment();
  for (var i = 0; i < warn.length; i++) {
    var warnItem = document.createElement('p');
    warnItem.innerHTML = warn[i];
    warnList.appendChild(warnItem);
  }
  for (var i = 0; i < light.length; i++) {
    var lightItem = document.createElement('p');
    lightItem.innerHTML = light[i];
    lightList.appendChild(lightItem);
  }
  for (var i = 0; i < comment.length; i++) {
    var commentItem = document.createElement('p');
    commentItem.innerHTML = comment[i];
    commentList.appendChild(commentItem);
  }
  var marqueeWarn = document.getElementById('marqueeWarn');
  var marqueeLight = document.getElementById('marqueeSpot');
  var marqueeMark = document.getElementById('marqueeMark');
  marqueeWarn.innerHTML = '';
  marqueeLight.innerHTML = '';
  marqueeMark.innerHTML = '';
  marqueeWarn.appendChild(warnList);
  marqueeLight.appendChild(lightList);
  marqueeMark.appendChild(commentList);

  marqueeWord(marqueeWarn);
  marqueeWord(marqueeLight);
  marqueeWord(marqueeMark);
}


/**
 * 日期选择器
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function($) {
  $.init();
  var result = $('#dtBtn')[0];
  result.innerText = date;
  var btns = $('.btn');
  btns.each(function(i, btn) {
    btn.addEventListener('tap', function() {
      var optionsJson = this.getAttribute('data-options') || '{}';
      var options = JSON.parse(optionsJson);
      var id = this.getAttribute('id');
      /*
       * 首次显示时实例化组件
       * 示例为了简洁，将 options 放在了按钮的 dom 上
       * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
       */
      var picker = new $.DtPicker(options);
      picker.show(function(rs,e) {
      var a = date;
        /*
         * rs.value 拼合后的 value
         * rs.text 拼合后的 text
         * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
         * rs.m 月，用法同年
         * rs.d 日，用法同年
         * rs.h 时，用法同年
         * rs.i 分（minutes 的第二个字母），用法同年
         */
        result.innerText = rs.value;
        date = rs.value;
        /* 
         * 返回 false 可以阻止选择框的关闭
         * return false;
         */
        /*
         * 释放组件资源，释放后将将不能再操作组件
         * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
         * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
         * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
         */         
        picker.dispose();
        if (date!== '' && a!== date) {
          document.getElementById('loading').style.display = 'block';     
          getYjjzd();
          getFtfx();
          getKjtz();
          getHyqs();
          getQyfx();
          getBylj();
          getYjfxChart();
          getXcfAll();
          getInfo();   
        }
          document.getElementById('loading').style.display = 'none';
      });
    }, false);
  });
})(mui);
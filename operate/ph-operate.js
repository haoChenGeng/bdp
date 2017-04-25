var _echart_width=$(document.body).width();

var newDate = new Date();
var date = newDate.Format('yyyy-MM-dd');

var allUrl = 'operate/ph/all';
var infoUrl = 'common/configRuleAndComment';
var phjeUrl = 'operate/ph/approved';
var sptglUrl = 'operate/ph/approvedRate';
var jdspUrl = 'operate/ph/jdApproved';
var dsyqUrl = 'operate/ph/overduePayment';
var yqlUrl = 'operate/ph/paymentRate';
var yqjgUrl = 'operate/ph/paymentStruct';
var zlqyUrl = 'operate/ph/overdueRate';
var jrjgUrl = 'operate/ph/financeStruct';
var spyqUrl = 'operate/ph/approvedPayment';

var opPhjeDay = clone(Options);
var opPhjeMon = clone(Options);
var opSptglDay = clone(Options);
var opSptglMon = clone(Options);
var opJdspDay = clone(Options);
var opJdspMon = clone(Options);

var opDsyqDay = clone(Options);
var opDsyqMon = clone(Options);
var opYqlDay = clone(Options);
var opYqlMon = clone(Options);
var opYqjg = clone(Options);
var opZlqy = clone(Options);

var opJrjgDay = clone(Options);
var opJrjgMon = clone(Options);
var opSpyqDay = clone(Options);
var opSpyqMon = clone(Options);

getSpyqChart();
getJrjgChart();
getZlqyChart();
getYqjgChart();
getYqlChart();
getDsyqChart();
getJdspChart();
getSptglChart();
getPhjeChart();
getPhAll();
getInfo();


var com4 = document.getElementById('writeComment');
com4.addEventListener('tap', function(e) {
  e.detail.gesture.preventDefault();
  var btnArray = ['取消', '确定'];
  mui.prompt('请输入备注','批示','评论',btnArray,function(e) {
    if (e.index == 1) {
console.log(e.value);
      if (e.value !== null && e.value !== "") {
        postComment('common/comment',e.value,'运营详情','普惠');
      }
    }else {
      
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
 * 审批与逾期
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getSpyqChart() {
  var spyq = getData(spyqUrl,date);
  var dataSpyqDay = spyq.ri;
  var dataSpyqMon = spyq.yue;

  if (dataSpyqDay) {
    getSpyq(opSpyqDay,dataSpyqDay);    
  }
  if (dataSpyqMon) {
    getSpyq(opSpyqMon,dataSpyqMon);    
  }

  var chart1 = echarts.init(document.getElementById('spyqDay'));
  $("#spyqDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opSpyqDay);

  var chart2 = echarts.init(document.getElementById('spyqMon'));
  $("#spyqMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opSpyqMon);

}

function getSpyq(op,data) {
  op.series.splice(0,op.series.length);
  op.legend.data = [];
  op.legend.data.push('审批通过率','逾期率(笔数)');
  // op.xAxis.data.splice(0,op.xAxis.data.length);
  op.title.text = '';
  op.xAxis.type = 'value';
  op.xAxis.axisLabel = {};
  op.xAxis.axisLabel.formatter = '{value}%';
  op.yAxis.type = 'category';
  op.yAxis.data = [];
  op.tooltip.trigger = 'axis';
  op.tooltip.axisPointer = {};
  op.tooltip.axisPointer.type = 'shadow';
  var a = {};
  var b = {};
  a.data = []; 
  b.data = []; 
  for (var i = 0; i < data['yuQiLu:BiShu'].length; i++) {
    a.data[i] = (data['yuQiLu:BiShu'][i].financeStruct.amt*100).toFixed(2);
  }
  for (var i = 0; i < data['shenPiTongGuoLu:'].length; i++) {
    b.data[i] = (data['shenPiTongGuoLu:'][i].financeStruct.amt*100).toFixed(2);
    op.yAxis.data[i] = data['shenPiTongGuoLu:'][i].financeStruct.productType;
  }
  a.name = '审批通过率';
  a.type = 'bar';
  b.name = '逾期率(笔数)';
  b.type = 'bar';
  op.series.push(b,a);
}

/**
 * 金融结构
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getJrjgChart() {
	var jrjg = getData(jrjgUrl,date);
	var dataJrjgDay = jrjg.ri;
	var dataJrjgMon = jrjg.yue;

  if (dataJrjgDay) {
  	getJrjg(opJrjgDay,dataJrjgDay);    
  }
  if (dataJrjgMon) {
  	getJrjg(opJrjgMon,dataJrjgMon);    
  }

	var chart1 = echarts.init(document.getElementById('jrjgDay'));
  $("#jrjgDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opJrjgDay);

  var chart2 = echarts.init(document.getElementById('jrjgMon'));
  $("#jrjgMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opJrjgMon);

}

function getJrjg(op,data) {
	op.series.splice(0, op.series.length);
	op.legend.data.splice(0, op.legend.data.length);
	op.legend.data.push('放款金额(万元)','逾期金额(万元)','待收金额(万元)');
	op.title.text = '';
  op.xAxis.data.splice(0,op.xAxis.data.length);  
  op.tooltip.trigger = 'axis';
  op.tooltip.axisPointer = {};
	op.tooltip.axisPointer.type = 'shadow';
	var a = {};
	var b = {};
	var c = {};
	a.data = []; 
	b.data = []; 
	c.data = []; 
	for (var i = 0; i < data.yuQiYuE.length; i++) {
		a.data[i] = data.yuQiYuE[i].financeStruct.amt;
	}
	for (var i = 0; i < data.daiShouYuE.length; i++) {
		b.data[i] = data.daiShouYuE[i].financeStruct.amt;
		op.xAxis.data[i] = data.daiShouYuE[i].financeStruct.productType;
	}
	for (var i = 0; i < data.fangKuanJinE.length; i++) {
		c.data[i] = data.fangKuanJinE[i].financeStruct.amt;
	}
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = '{value}万元';
	a.name = '逾期金额(万元)';
	a.type = 'bar';
  a.barGap = 0;
	b.name = '待收金额(万元)';
	b.type = 'bar';
  b.barGap = 0;
	c.name = '放款金额(万元)';
	c.type = 'bar';
  c.barGap = 0;
	op.series.push(b,a,c);
}


/**
 * 账龄迁移
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getZlqyChart() {
	var zlqy = getData(zlqyUrl,date);
  if (zlqy.length) {
  	opZlqy.series.splice(0,opZlqy.series.length);
    opZlqy.legend.data = [];
    opZlqy.xAxis.data.splice(0,opZlqy.xAxis.data.length);
    opZlqy.title.text = '';
    opZlqy.yAxis.axisLabel = {};
    opZlqy.yAxis.axisLabel.formatter = '{value}%';
    opZlqy.tooltip.trigger = 'axis';
    opZlqy.tooltip.axisPointer = {};
    opZlqy.tooltip.axisPointer.type = 'shadow';
    for (var i = 0; i < zlqy.length; i++) {    
      opZlqy.legend.data[i] = zlqy[i].detailType;

      var item = {
      	name: '',
      	type: 'bar',
      	stack: '总量',
      	label: {
      		normal: {
      			show: false,
      			position: 'insideTop'
      		}
      	},
      	data: []
      };
      item.data = [];
      item.name = zlqy[i].detailType;
      item.type = 'bar';
      for (var j = 0; j < zlqy[i].list.length; j++) {
        item.data[j] = (zlqy[i].list[j].overdueRate*100).toFixed(2);
      }
      opZlqy.series.push(item);
    }
    for (var k = 0; k < zlqy[0].list.length; k++) {
      opZlqy.xAxis.data[k] = zlqy[0].list[k].datDt;
    }    
  }

	var chart1 = echarts.init(document.getElementById('zlqyDay'));
  $("#zlqyDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opZlqy);

  var chart2 = echarts.init(document.getElementById('zlqyMon'));
  $("#zlqyMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opZlqy);
}

/**
 * 逾期结构
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getYqjgChart() {
	var yqjg = getData(yqjgUrl,date);
  if (yqjg.length) {
  	opYqjg.series.splice(0,opYqjg.series.length);
    opYqjg.legend.data = [];
    opYqjg.xAxis.data.splice(0,opYqjg.xAxis.data.length);
    opYqjg.title.text = '';
    opYqjg.grid.bottom = '30%';
    opYqjg.yAxis.axisLabel = {};
    opYqjg.yAxis.axisLabel.formatter = '{value}%';
    opYqjg.tooltip.trigger = 'axis';
    opYqjg.tooltip.axisPointer = {};
    opYqjg.tooltip.axisPointer.type = 'shadow';
    for (var i = 0; i < yqjg.length; i++) {
      opYqjg.legend.data[i] = yqjg[i].detailType;

      var item = {
      	name: '',
      	type: 'bar',
      	stack: '总量',
      	label: {
      		normal: {
      			show: false,
      			position: 'insideTop'
      		}
      	},
      	data: []
      };
      item.data = [];
      item.name = yqjg[i].detailType;
      item.type = 'bar';
      for (var j = 0; j < yqjg[i].list.length; j++) {
        item.data[j] = (yqjg[i].list[j].overdueRate*100).toFixed(2);
      }
      opYqjg.series.push(item);
    }
    for (var k = 0; k < yqjg[0].list.length; k++) {
      opYqjg.xAxis.data[k] = yqjg[0].list[k].datDt;
    }    
  }
	var chart1 = echarts.init(document.getElementById('yqjgDay'));
  $("#yqjgDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opYqjg);

  var chart2 = echarts.init(document.getElementById('yqjgMon'));
  $("#yqjgMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opYqjg);
}


/**
 * 逾期率
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getYqlChart() {
	var yql = getData(yqlUrl,date);
	var dataYqlDay = yql.ri;
	var dataYqlMon = yql.yue;

  if (dataYqlDay) {
  	getYql(opYqlDay,dataYqlDay);    
  }
  if (dataYqlMon) {
  	getYql(opYqlMon,dataYqlMon);    
  }

	var chart1 = echarts.init(document.getElementById('yqlDay'));
  $("#yqlDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opYqlDay);

  var chart2 = echarts.init(document.getElementById('yqlMon'));
  $("#yqlMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opYqlMon);

}

function getYql(op,data) {
	op.series.splice(0, op.series.length);
	op.legend.data.splice(0, op.legend.data.length);
	op.legend.data.push('逾期率(笔数)','逾期率(金额)');
	op.title.text = '';
  op.xAxis.data.splice(0,op.xAxis.data.length);  
	var a = {};
	var b = {};
	a.data = []; 
	b.data = []; 
	for (var i = 0; i < data['yuQiLu:BiShu'].length; i++) {
		a.data[i] = (data['yuQiLu:BiShu'][i].operativeCustZx.num*100).toFixed(2);
	}
	for (var i = 0; i < data['yuQiLu:JinE'].length; i++) {
		b.data[i] = (data['yuQiLu:JinE'][i].operativeCustZx.num*100).toFixed(2);
		op.xAxis.data[i] = data['yuQiLu:JinE'][i].operativeCustZx.datDt;
	}
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = '{value}%';
	a.name = '逾期率(笔数)';
	a.type = 'line';
	a.stack = '总量';
	b.name = '逾期率(金额)';
	b.type = 'line';
	b.stack = '总量';
	op.series.push(b,a);
}


/**
 * 待收逾期
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getDsyqChart() {
	var dsyq = getData(dsyqUrl,date);
	var dataDsyqDay = dsyq.ri;
	var dataDsyqMon = dsyq.yue;

  if (dataDsyqDay) {
  	getDsyq(opDsyqDay,dataDsyqDay);    
  }
  if (dataDsyqMon) {
  	getDsyq(opDsyqMon,dataDsyqMon);    
  }

	var chart1 = echarts.init(document.getElementById('dsyqDay'));
  $("#dsyqDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opDsyqDay);

  var chart2 = echarts.init(document.getElementById('dsyqMon'));
  $("#dsyqMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opDsyqMon);

}

function getDsyq(op,data) {
	op.series.splice(0, op.series.length);
	op.legend.data.splice(0, op.legend.data.length);
	op.legend.data.push('放款金额','逾期金额','待收金额');
	op.title.text = '';
  op.xAxis.data.splice(0,op.xAxis.data.length);  
	var a = {};
	var b = {};
	var c = {};
	a.data = []; 
	b.data = []; 
	c.data = []; 
	for (var i = 0; i < data.yuQiJinE.length; i++) {
		a.data[i] = data.yuQiJinE[i].operativeCustZx.num;
	}
	for (var i = 0; i < data.daiShouYuE.length; i++) {
		b.data[i] = data.daiShouYuE[i].operativeCustZx.num;
		op.xAxis.data[i] = data.daiShouYuE[i].operativeCustZx.datDt;
	}
	for (var i = 0; i < data.fangKuanJinE.length; i++) {
		c.data[i] = data.fangKuanJinE[i].operativeCustZx.num;
	}
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = function(value,index) {
    return getUnit(value);
  };
	a.name = '逾期金额';
	a.type = 'line';
	a.stack = '总量';
	b.name = '待收金额';
	b.type = 'line';
	b.stack = '总量';
	c.name = '放款金额';
	c.type = 'line';
	c.stack = '总量';
	op.series.push(b,a,c);
}


/**
 * 进单审批
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getJdspChart() {
	var jdsp = getData(jdspUrl,date);
	var dataJdspDay = jdsp.ri;
	var dataJdspMon = jdsp.yue;

  if (dataJdspDay) {
  	getJdsp(opJdspDay,dataJdspDay);    
  }
  if (dataJdspMon) {
  	getJdsp(opJdspMon,dataJdspMon);    
  }

	var chart1 = echarts.init(document.getElementById('listpassTableDay'));
  $("#listpassTableDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opJdspDay);

  var chart2 = echarts.init(document.getElementById('listpassTableMon'));
  $("#listpassTableMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opJdspMon);

}

function getJdsp(op,data) {
	op.series.splice(0, op.series.length);
	op.legend.data.splice(0, op.legend.data.length);
	op.legend.data.push('进单量','审批量','通过量');
	op.title.text = '';
  op.xAxis.data.splice(0,op.xAxis.data.length);  
	var a = {};
	var b = {};
	var c = {};
	a.data = []; 
	b.data = []; 
	c.data = []; 
	for (var i = 0; i < data.jinDanLiang.length; i++) {
		b.data[i] = data.jinDanLiang[i].operativeCustZx.num;
		op.xAxis.data[i] = data.jinDanLiang[i].operativeCustZx.datDt;
	}
	for (var i = 0; i < data.shenPiLiang.length; i++) {
		a.data[i] = data.shenPiLiang[i].operativeCustZx.num;
	}
	for (var i = 0; i < data.tongGuoLiang.length; i++) {
		c.data[i] = data.tongGuoLiang[i].operativeCustZx.num;
	}
	a.name = '审批量';
	a.type = 'line';
	a.stack = '总量';
	b.name = '进单量';
	b.type = 'line';
	b.stack = '总量';
	c.name = '通过量';
	c.type = 'line';
	c.stack = '总量';
	op.series.push(b,a,c);
}


/**
 * 审批通过率
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getSptglChart() {
	var sptgl = getData(sptglUrl,date);
	var dataSptglDay = sptgl.ri;
	var dataSptglMon = sptgl.yue;

  if (dataSptglDay) {
  	getSptgl(opSptglDay,dataSptglDay);    
  }
  if (dataSptglMon) {
  	getSptgl(opSptglMon,dataSptglMon);    
  }

	var chart1 = echarts.init(document.getElementById('approvalpassTableDay'));
  $("#approvalpassTableDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opSptglDay);

  var chart2 = echarts.init(document.getElementById('approvalpassTableMon'));
  $("#approvalpassTableMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opSptglMon);

}

function getSptgl(op,data) {
	op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('审批通过率');
  op.xAxis.data.splice(0,op.xAxis.data.length);

  var a = {};
  a.data = [];
  for (var i = 0; i < data.length; i++) {
    a.data[i] = (data[i].passRate*100).toFixed(2);
    op.xAxis.data[i] = data[i].datDt;
  }
  a.name = '审批通过率';
  a.type = 'line';
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = '{value}%';
  op.series.push(a);
}


/**
 * 批核金额
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getPhjeChart() {
	var phje = getData(phjeUrl,date);
	var dataPhjeDay = phje.ri;
	var dataphjeMon = phje.yue;

  if (dataPhjeDay) {
  	getPhje(opPhjeDay,dataPhjeDay);    
  }
  if (dataphjeMon) {
  	getPhje(opPhjeMon,dataphjeMon);    
  }

	var chart1 = echarts.init(document.getElementById('batchfundTableDay'));
  $("#batchfundTableDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opPhjeDay);

  var chart2 = echarts.init(document.getElementById('batchfundTableMon'));
  $("#batchfundTableMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opPhjeMon);

}

function getPhje(op,data) {
	op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.grid.top = '20%';
  op.xAxis.data.splice(0,op.xAxis.data.length);  
  op.legend.data.push('批核金额(万元)','件均金额(万元)');
  op.yAxis = [
  	{
  		type: 'value',
  		name: '批核金额(万元)',
  		position: 'left',
  	},
  	{
  		type: 'value',
  		name: '件均金额(万元)',
  		min: 0,
  		max: 10,
  		position: 'right'
  	}
  ];
  var a = {
  	name: '批核金额(万元)',
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
  	name: '件均金额(万元)',
  	type: 'line',
  	stack: '总量',
  	label: {
  		normal: {
  			show: true,
  			position: 'top'
  		}
  	},
  	data: []
  };
  for (var i = 0; i < data.piHeJinE.length; i++) {
  	a.data[i] = data.piHeJinE[i].annualizedCoefficient.amt;
  	op.xAxis.data[i] = data.piHeJinE[i].annualizedCoefficient.datDt;
  }
  for (var j = 0; j < data.jianJunJinE.length; j++) {
  	b.data[j] = data.jianJunJinE[j].annualizedCoefficient.amt;
  }
  op.series.push(a,b);
}


/**
 * 数据总览
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getPhAll() {
	var all = getData(allUrl,date);
  if (all.vpassRate) {
  	document.getElementById('sptgl').innerHTML = all.vpassRate + '%';
  	document.getElementById('spje').innerHTML = all.vamountPh;
  	document.getElementById('jjje').innerHTML = all.vamountAvg;
  	document.getElementById('jdl').innerHTML = all.vnumJd;
  	document.getElementById('yqje').innerHTML = all.vamountOverdue;
  	document.getElementById('yql').innerHTML = all.voverdueRateAmount + '%';
  	document.getElementById('ljfk').innerHTML = all.vamountFk;
  	document.getElementById('dsje').innerHTML = all.vamountDs;    
  }
}

/**
 * 信息提示
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getInfo() {
  var info = getInfoData(infoUrl,date,'普惠','运营详情');
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
          getSpyqChart();
          getJrjgChart();
          getZlqyChart();
          getYqjgChart();
          getYqlChart();
          getDsyqChart();
          getJdspChart();
          getSptglChart();
          getPhjeChart();
          getPhAll();
          getInfo();
        }
          document.getElementById('loading').style.display = 'none';
      });
    }, false);
  });
})(mui);
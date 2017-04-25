mui.init();

var infoUrl = 'common/configRuleAndComment';
var allUrl = 'performance/all';
var progressUrl = 'performance/kpi';
var structureUrl = 'performance/category';
var trendUrl = 'performance/week';
var tableUrl = 'performance/kpi/detail';
var commentUrl = 'common/comment';

var opProgress = clone(Options);
var opStructureZx = clone(Options);
var opStructureXcf = clone(Options);
var opStructurePh = clone(Options);
var opTrendZx = clone(Options);
var opTrendXcf = clone(Options);
var opTrendPh = clone(Options);

var newDate = new Date();
var date = newDate.Format('yyyy-MM-dd');

if (!localStorage.getItem('code')) {
  var cc = getQueryString('code');  
  if (cc !== null ) {
    localStorage.setItem("code", cc);
  }
}

if (!localStorage.getItem('token')) {
	// getAuthority();	
}

getInfo();
getAll();
renderProgress();
renderTable();
renderStructure();
renderTrend();

/**
 * 信息提示
 * @param  {String} url 
 * @return {}     
 */
function getInfo() {
	var info = getInfoData(infoUrl,date,'在线','业绩概览') || {};
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
	marqueeWord(marqueeSpot);
	marqueeWord(marqueeMark);

}

/**
 * 总体数据
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getAll() {
	var all = getData(allUrl,date);
	if (all.zaiXian) {
		document.getElementById('zxPtd').innerHTML = all.zaiXian.vAmountPtd;
		document.getElementById('zxMtd').innerHTML = all.zaiXian.vAmountMtd;
		document.getElementById('zxYtd').innerHTML = all.zaiXian.vAmountYtd;
	}
	if (all.xinCaiFu) {
		document.getElementById('xcfPtd').innerHTML = all.xinCaiFu.vAmountPtd;
		document.getElementById('xcfMtd').innerHTML = all.xinCaiFu.vAmountMtd;
		document.getElementById('xcfYtd').innerHTML = all.xinCaiFu.vAmountYtd;
	}
	if (all.puHui) {
		document.getElementById('phPtd').innerHTML = all.puHui.vAmountPtd;
		document.getElementById('phMtd').innerHTML = all.puHui.vAmountMtd;
		document.getElementById('phYtd').innerHTML = all.puHui.vAmountYtd;
	}
	if (all.fenQi) {
		document.getElementById('fqPtd').innerHTML = all.fenQi.vAmountPtd;
		document.getElementById('fqMtd').innerHTML = all.fenQi.vAmountMtd;
		document.getElementById('fqYtd').innerHTML = all.fenQi.vAmountYtd;
	}else {
		document.getElementById('fqPtd').innerHTML = 0;
		document.getElementById('fqMtd').innerHTML = 0;
		document.getElementById('fqYtd').innerHTML = 0;
	}
}


/**
 * 编辑备注
 * @type {[type]}
 */
var com1 = document.getElementById('writeComment');
com1.addEventListener('tap', function(e) {
	e.detail.gesture.preventDefault();
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入备注','批示','评论',btnArray,function(e) {
		if (e.index == 1) {
console.log(e.value);
			if (e.value !== null && e.value !== "") {
				postComment('common/comment',e.value,'业绩概览','在线');
			}
		}
	});
});

function refreshComment(res) {
	if (res.code === 0 ) {
		mui.toast('评论成功!');
		getInfo();
	}else {
		mui.alert(res.msg);
	}
}

/**
 * 进度分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function renderProgress() {
	var progress = getData(progressUrl,date);
	opProgress.series.splice(0,opProgress.series.length);
	// opProgress.title.text = '月KPI达成率';
	if (progress.puHui) {
		var puHui = {
			name: '',
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
		opProgress.legend.data.push(progress.puHui.name);
		puHui.name = progress.puHui.name;
		for (var i = 0; i < progress.puHui.list.length; i++) {
// console.log(getUnit(progress.puHui.list[i].vcompletionRate));
			puHui.data[i] = progress.puHui.list[i].vcompletionRate;
		}
		opProgress.series.push(puHui);
	}
	if (progress.zaiXian) {
		var zaiXian = {
			name: '',
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
		opProgress.legend.data.push(progress.zaiXian.name);
		zaiXian.name = progress.zaiXian.name;
		for (var i = 0; i < progress.zaiXian.list.length; i++) {
			zaiXian.data[i] = progress.zaiXian.list[i].vcompletionRate;
			opProgress.xAxis.data[i] = progress.zaiXian.list[i].performanceKpi.datDt;
		}
		opProgress.series.push(zaiXian);
	}
	if (progress.xinCaiFu) {
		opProgress.legend.data.push(progress.xinCaiFu.name);
		var xinCaiFu = {
			name: '',
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
		xinCaiFu.name = progress.xinCaiFu.name;
		for (var i = 0; i < progress.xinCaiFu.list.length; i++) {
			xinCaiFu.data[i] = progress.xinCaiFu.list[i].vcompletionRate;
		}
		opProgress.yAxis.axisLabel = {};
		opProgress.yAxis.axisLabel.formatter = '{value}%';
		opProgress.series.push(xinCaiFu);		
	}
}



/**
 * 生成表格
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function renderTable() {
	var table = getData(tableUrl,date);
	var list = document.createDocumentFragment();
	var head = document.createElement('tr');
	head.innerHTML = '<th>业务线</th><th>月累计业绩</th><th>月目标进度</th><th>最近7天日均进度</th><th>月剩余日均目标</th><th>年累计业绩</th>';
	list.appendChild(head);
	for (var i = 0; i < table.length; i++) {
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		var td6 = document.createElement('td');
		td1.innerHTML = table[i].performanceKpi.companyType;
		td2.innerHTML = table[i].vamountMtd;
		td3.innerHTML = table[i].vcompletionRate;
		td5.innerHTML = table[i].vamountAvg7Day;
		td4.innerHTML = table[i].vamountSurplus;
		td6.innerHTML = table[i].vamountYtd;
		var tr = document.createElement('tr');
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		list.appendChild(tr);
	}
	var trendTable = document.getElementById('table');
	trendTable.innerHTML = '';
	trendTable.appendChild(list);
}


/**
 * 获取业绩结构配置项数据
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function renderStructure() {	
	var structure = getData(structureUrl,date);
	var dataStructureZx = structure.zaiXian;
	var dataStructureXcf = structure.xinCaiFu;
	var dataStructurePh = structure.puHui;
	if (dataStructureZx) {
		getStructure(opStructureZx,dataStructureZx);		
	}
	if (dataStructureXcf) {
		getStructure(opStructureXcf,dataStructureXcf);		
	}
	if (dataStructurePh) {
		getStructure(opStructurePh,dataStructurePh);			
	}
}

function getStructure(op,data) {
	op.series.splice(0,op.series.length);
	op.legend.data = [];
	for (var i = 0; i < data.length; i++) {
		var item = {};
		op.legend.data.push(data[i].performanceCategory.category);
		item.name = data[i].performanceCategory.category;
		item.type = 'bar';
		item.stack = '总量';
		item.label = {};
		item.label.normal = {};
		item.label.normal.show = true;
		item.label.normal.position = 'insideRight';
		item.label.normal.formatter = '{c}%';
		item.data = [];
		item.data.push((data[i].performanceCategory.rateYtd*100).toFixed(1),(data[i].performanceCategory.rateMtd*100).toFixed(1),(data[i].performanceCategory.ratePtd*100).toFixed(1));
		item.data.reverse();
		op.series.push(item);		
	}		
	op.tooltip.axisPointer = {};
	op.tooltip.axisPointer.type = 'shadow';
	op.xAxis.type = 'value';
	op.xAxis.axisLabel = {};
	op.xAxis.axisLabel.formatter = '{value}%';
	op.yAxis.type = 'category';
	op.yAxis.data = ['当日','月累计','年累计'];
}

/**
 * 业绩趋势
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function renderTrend() {
	var trend = getData(trendUrl,date);
	var dataTrendZx = trend.zaiXian;
	var dataTrendXcf = trend.xinCaiFu;
	var dataTrendPh = trend.puHui;
	if (dataTrendZx) {
		getTrend(opTrendZx,dataTrendZx);		
	}
	if (dataTrendXcf) {
		getTrend(opTrendXcf,dataTrendXcf);		
	}
	if (dataTrendPh) {
		getTrend(opTrendPh,dataTrendPh);		
	}
}

function getTrend(op,data) {
	op.series.splice(0, op.series.length);
	op.legend.data.splice(0, op.legend.data.length);
	op.legend.data.push('上上周','上周','本周');
	var sz = {};
	var ssz = {};
	var bz = {};
	sz.data = []; 
	ssz.data = []; 
	bz.data = []; 
	if (data.shangShangZhou) {
		for (var i = 0; i < data.shangShangZhou.length; i++) {
			ssz.data[i] = data.shangShangZhou[i].performanceWeek.amountPwk;
			op.xAxis.data[i] = data.shangShangZhou[i].performanceWeek.weekName;
		}
	}
	if (data.shangZhou) {
		for (var i = 0; i < data.shangZhou.length; i++) {
			sz.data[i] = data.shangZhou[i].performanceWeek.amountPwk;
		}
	}
	if (data.benZhou) {
		for (var i = 0; i < data.benZhou.length; i++) {
			bz.data[i] = data.benZhou[i].performanceWeek.amountPwk;
		}
	}
	op.yAxis.axisLabel = {};
	op.yAxis.axisLabel.formatter = function(value,index) {
		return getUnit(value);
	};
	sz.name = '上周';
	sz.type = 'line';
	sz.stack = '总量';
	ssz.name = '上上周';
	ssz.type = 'line';
	ssz.stack = '总量';
	bz.name = '本周';
	bz.type = 'line';
	bz.stack = '总量';
	op.series.push(ssz,sz,bz);
}


var chartProgress = echarts.init(document.getElementById('zhexian'));
var chartStructure = echarts.init(document.getElementById('structureZx'));
var chartTrend = echarts.init(document.getElementById('trendZx'));
chartProgress.setOption(opProgress);
chartStructure.setOption(opStructureZx);
chartTrend.setOption(opTrendZx);


/**
 * tab切换resize图表
 * @type {[type]}
 */
var width = screen.width;
mui(".mui-segmented-control").on('tap','#xcf',function(){
	var wrap1 = document.getElementById('structureXcf');
	var wrap2 = document.getElementById('trendXcf');
	var chartStructureXcf = echarts.init(wrap1);
	var chartTrendXcf = echarts.init(wrap2);
	wrap1.style.height = '300px';
	wrap2.style.height = '300px';
	wrap1.style.width = width + 'px';
	wrap2.style.width = width + 'px';
	chartStructureXcf.resize();
	chartTrendXcf.resize();
	chartStructureXcf.setOption(opStructureXcf);
	chartTrendXcf.setOption(opTrendXcf);
});

mui(".mui-segmented-control").on('tap','#ph',function(){
	var wrap1 = document.getElementById('structurePh');
	var wrap2 = document.getElementById('trendPh');
	wrap1.style.height = '300px';
	wrap2.style.height = '300px';
	wrap1.style.width = width + 'px';
	wrap2.style.width = width + 'px';
	var chartTrend = echarts.init(wrap2);
	var chartStructure = echarts.init(wrap1);
	chartStructure.resize();
	chartTrend.resize();
	chartStructure.setOption(opStructurePh);
	chartTrend.setOption(opTrendPh);
});

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
					getInfo();
					getAll();
					renderProgress();
					renderTable();
					renderStructure();
					renderTrend();		
				}
					document.getElementById('loading').style.display = 'none';
			});
		}, false);
	});
})(mui);


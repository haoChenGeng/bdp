mui.init();

var _echart_width = $(document.body).width();
$('.me-control-item').css('width',_echart_width/4);

var newDate = new Date();
var date = newDate.Format('yyyy-MM-dd');

var totalUrl = 'operate/zx/all';
var infoUrl = 'common/configRuleAndComment';
var nhxsUrl = 'operate/zx/annualizedCoefficient';
var hkUrl = 'operate/zx/cash';
var registUrl = 'operate/zx/cust';
var rjtzUrl = 'operate/zx/InvestmentPerCapita';
var khzlUrl = 'operate/zx/custQuality';
var tzsjUrl = 'operate/zx/point';
var qdlyUrl = 'operate/zx/channel';
var qdzhUrl = 'operate/zx/conversion';
var wtzUrl = 'operate/zx/unInv';
var zjctUrl = 'operate/zx/chargeFunds';
var dhUrl = 'operate/zx/stayStill';

var opNhxsDay = clone(Options);
var opNhxsMon = clone(Options);
var opHkDay = clone(Options);
var opHkMon = clone(Options);

var opRegistDay = clone(Options);
var opRegistMon = clone(Options);
var opRjtzDay = clone(Options);
var opRjtzMon = clone(Options);
var opKhzlDay = clone(Options);
var opKhzlMon = clone(Options);
var opTzsj = clone(Options);
var opQdly = clone(Options);
var opQdzh = clone(Options);
var opWtz = clone(Options);

var opZjctDay = clone(Options);
var opZjctMon = clone(Options);

var opTotalDay = clone(Options);
var opDaydayDay = clone(Options);
var opMonsDay = clone(Options);
var opFtotDay = clone(Options);
var opTtosDay = clone(Options);
var opStonDay = clone(Options);
var opNtotDay = clone(Options);
var opMoretDay = clone(Options);

var opTotalMon = clone(Options);
var opDaydayMon = clone(Options);
var opMonsMon  = clone(Options);
var opFtotMon  = clone(Options);
var opTtosMon  = clone(Options);
var opStonMon  = clone(Options);
var opNtotMon  = clone(Options);
var opMoretMon= clone(Options);




getInfo();
total();
getNhxsChart();
getHkChart();
getRegChart();
getRjtzChart();
getKhzlChart();
getTzsjChart();
getQdlyChart();
getQdzhChart();
getWtzChart();
getZjctChart();
getDhChart();

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
        postComment('common/comment',e.value,'运营详情','在线');
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
 * 日月tab切换
 * @param  {[type]} ){               var wrap1 [description]
 * @return {[type]}     [description]
 */
mui(".mui-segmented-control").on('tap','#month',function(){
  var wrap1 = document.getElementById('nhxsMon');
  var wrap2 = document.getElementById('hkMon');
  var chart1 = echarts.init(wrap1);
  var chart2 = echarts.init(wrap2);
  wrap1.style.height = '300px';
  wrap2.style.height = '300px';
  wrap1.style.width = _echart_width + 'px';
  wrap2.style.width = _echart_width + 'px';
  chart1.resize();
  chart2.resize();
  chart1.setOption(opNhxsMon);
  chart2.setOption(opHkMon);
});


/**
 * 待还
 * @return {[type]} [description]
 */
function getDhChart() {
  var dh = getData(dhUrl,date);
  var dataDhDay = dh.ri;
  var dataDhMon = dh.yue;

  getDh(opTotalDay,dataDhDay.zongJi);
  getDh(opDaydayDay,dataDhDay.tianTianNiu);
  getDh(opMonsDay,dataDhDay.yueYueNiu);
  getDh(opFtotDay,dataDhDay['1-3GeYue']);
  getDh(opTtosDay,dataDhDay['3-6GeYue']);
  getDh(opStonDay,dataDhDay['6-9GeYue']);
  getDh(opNtotDay,dataDhDay['9-12GeYue']);
  getDh(opMoretDay,dataDhDay['12GeYueYiShang']);

  getDh(opTotalMon,dataDhMon.zongJi);
  getDh(opDaydayMon,dataDhMon.tianTianNiu);
  getDh(opMonsMon,dataDhMon.yueYueNiu);
  getDh(opFtotMon,dataDhMon['1-3GeYue']);
  getDh(opTtosMon,dataDhMon['3-6GeYue']);
  getDh(opStonMon,dataDhMon['6-9GeYue']);
  getDh(opNtotMon,dataDhMon['9-12GeYue']);
  getDh(opMoretMon,dataDhMon['12GeYueYiShang']);

  renderDhChart(opTotalDay,'totalChart');
  renderDhChart(opDaydayDay,'daydayChart');
  renderDhChart(opMonsDay,'moonsChart');
  renderDhChart(opFtotDay,'ftotChart');
  renderDhChart(opTtosDay,'ttosChart');
  renderDhChart(opStonDay,'stonChart');
  renderDhChart(opNtotDay,'ntotChart');
  renderDhChart(opMoretDay,'moretChart');

  renderDhChart(opTotalMon,'totalChartMon');
  renderDhChart(opDaydayMon,'daydayChartMon');
  renderDhChart(opMonsMon,'moonsChartMon');
  renderDhChart(opFtotMon,'ftotChartMon');
  renderDhChart(opTtosMon,'ttosChartMon');
  renderDhChart(opStonMon,'stonChartMon');
  renderDhChart(opNtotMon,'ntotChartMon');
  renderDhChart(opMoretMon,'moretChartMon');

}

function getDh(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('待还');
  var a = {};
  a.data = [];
  for (var i = 0; i < data.length; i++) {
    a.data[i] = data[i].operativeCustZx.num;
    op.xAxis.data[i] = data[i].operativeCustZx.datDt;
  }
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = function(value,index) {
    return getUnit(value);
  };
  a.name = '待还';
  a.type = 'line';
  op.series.push(a);
}

function renderDhChart(op,id) {
  $('#'+id).css({
    height: '280px',
    width: _echart_width
  });
  var chart = echarts.init(document.getElementById(id));
  chart.resize();
  chart.setOption(op);
}


/**
 * 资金充提
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getZjctChart() {
  var zjct = getData(zjctUrl,date);
  var dataZjctDay = zjct.ri;
  var dataZjctMon = zjct.yue;

  getZjct(opZjctDay,dataZjctDay);
  getZjct(opZjctMon,dataZjctMon);

  var chart1 = echarts.init(document.getElementById('zjctDay'));
  $("#zjctDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opZjctDay);

  var chart2 = echarts.init(document.getElementById('zjctMon'));
  $("#zjctMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opZjctMon);
}

function getZjct(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.xAxis.data.splice(0,op.xAxis.data.length);
  op.title.text = '';
  op.legend.data.push('充值额','提现额');
  var a = {};
  var b = {};
  a.data = [];
  b.data = [];
  for (var i = 0; i < data.chongZhiE.length; i++) {
    a.data[i] = data.chongZhiE[i].operativeCustZx.num;
    op.xAxis.data[i] = data.chongZhiE[i].operativeCustZx.datDt;
  }
  for (var i = 0; i < data.tiXianE.length; i++) {
    b.data[i] = data.tiXianE[i].operativeCustZx.num;
  }
  a.name = '充值额';
  a.type = 'line';
  b.name = '提现额';
  b.type = 'line';
  op.series.push(a,b);
}


/**
 * 未投资客户分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getWtzChart() {
  var wtz = getData(wtzUrl,date);
  opWtz.series.splice(0,opWtz.series.length);
  opWtz.legend.data = [];
  opWtz.xAxis.data.splice(0,opWtz.xAxis.data.length);
  opWtz.title.text = '';
  for (var i = 0; i < wtz.length; i++) {    
    opWtz.legend.data[i] = wtz[i].type;

    var item = {};
    item.data = [];
    item.name = wtz[i].type;
    item.type = 'line';
    for (var j = 0; j < wtz[i].list.length; j++) {
      item.data[j] = wtz[i].list[j].num;
    }
    opWtz.series.push(item);
  }
  for (var k = 0; k < wtz[0].list.length; k++) {
    opWtz.xAxis.data[k] = wtz[0].list[k].datDt;
  }
  var chart1 = echarts.init(document.getElementById('wtzDay'));
  $("#wtzDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opWtz);

  var chart2 = echarts.init(document.getElementById('wtzMon'));
  $("#wtzMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opWtz);

}

/**
 * 渠道转化趋势
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getQdzhChart() {
  var qdzh = getData(qdzhUrl,date);
  opQdzh.series.splice(0,opQdzh.series.length);
  opQdzh.legend.data = [];
  opQdzh.xAxis.data.splice(0,opQdzh.xAxis.data.length);
  opQdzh.title.text = '';

  for (var i = 0; i < qdzh.length; i++) {    
    opQdzh.legend.data[i] = qdzh[i].channel;

    var item = {};
    item.data = [];
    item.name = qdzh[i].channel;
    item.type = 'line';
    for (var j = 0; j < qdzh[i].list.length; j++) {
      item.data[j] = (qdzh[i].list[j].rate*100).toFixed(2);
    }
    opQdzh.series.push(item);
  }
  for (var k = 0; k < qdzh[0].list.length; k++) {
    opQdzh.xAxis.data[k] = qdzh[0].list[k].datDt;
  }
  opQdzh.yAxis.axisLabel = {};
  opQdzh.yAxis.axisLabel.formatter = '{value}%';

  var chart1 = echarts.init(document.getElementById('qdzhDay'));
  $("#qdzhDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opQdzh);

  var chart2 = echarts.init(document.getElementById('qdzhMon'));
  $("#qdzhMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opQdzh);

}


/**
 * 渠道来源
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getQdlyChart() {
  var qdly = getData(qdlyUrl,date);
  opQdly.series.splice(0,opQdly.series.length);
  opQdly.legend.data = [];
  opQdly.title.text = '';
  for (var i = 0; i < qdly.length; i++) {
    var item = {};
    opQdly.legend.data.push(qdly[i].channelType);
    item.name = qdly[i].channelType;
    item.type = 'bar';
    item.stack = '总量';
    item.label = {};
    item.label.normal = {};
    item.label.normal.show = true;
    item.label.normal.position = 'insideRight';
    item.data = [];
    item.data.push((qdly[i].dangRi*100).toFixed(2),(qdly[i].yueLeiJi*100).toFixed(2),(qdly[i].nianLeiJi*100).toFixed(2));
    item.data.reverse();
    opQdly.series.push(item);   
  }
  opQdly.tooltip.axisPointer = {};
  opQdly.tooltip.axisPointer.type = 'shadow';
  opQdly.xAxis.type = 'value';
  opQdly.xAxis.axisLabel = {};
  opQdly.xAxis.axisLabel.formatter = '{value}%';
  opQdly.yAxis.type = 'category';
  opQdly.yAxis.data = ['当日','月累计','年累计'];

  var chart1 = echarts.init(document.getElementById('qdlyDay'));
  $("#qdlyDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opQdly);

  var chart2 = echarts.init(document.getElementById('qdlyMon'));
  $("#qdlyMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opQdly);

}


/**
 * 投资时间分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getTzsjChart() {
  var tzsj = getData(tzsjUrl,date);
  opTzsj.series.splice(0, opTzsj.series.length);
  opTzsj.legend.data.splice(0, opTzsj.legend.data.length);
  opTzsj.title.text = '';
  opTzsj.legend.data.push('用户投资时间');
  var a = {};
  a.data = [];
  for (var i = 0; i < tzsj.length; i++) {
    a.data[i] = (tzsj[i].custRate*100).toFixed(2);
    opTzsj.xAxis.data[i] = tzsj[i].dateType;
  }
  a.name = '用户投资时间';
  a.type = 'line';
  a.label = {};
  a.label.normal = {};
  a.label.normal.formatter = '{value}%';
  opTzsj.yAxis.axisLabel = {};
  opTzsj.yAxis.axisLabel.formatter = '{value}%';
  opTzsj.series.push(a);

  var chart1 = echarts.init(document.getElementById('tzsjDay'));
  $("#tzsjDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opTzsj);

  var chart2 = echarts.init(document.getElementById('tzsjMon'));
  $("#tzsjMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opTzsj);

}


/**
 * 客户质量分析
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getKhzlChart() {
  var khzl = getData(khzlUrl,date);
  var dataKhzlDay = khzl;
  var dataKhzlMon = khzl;

  getKhzl(opKhzlDay,dataKhzlDay);    
  getKhzl(opKhzlMon,dataKhzlMon);    

  var chart1 = echarts.init(document.getElementById('khzlDay'));
  $("#khzlDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opKhzlDay);

  var chart2 = echarts.init(document.getElementById('khzlMon'));
  $("#khzlMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opKhzlMon);

}

function getKhzl(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.xAxis.data = [];
  op.legend.data.push('复投用户','首投用户');
  var a = {};
  var b = {};
  a.data = [];
  b.data = [];
  if (data.fuTouKeHu) {
    for (var i = 0; i < data.fuTouKeHu.length; i++) {
      a.data[i] = data.fuTouKeHu[i].numInv;
      op.xAxis.data[i] = data.fuTouKeHu[i].invType;
    }    
  }
  if (data.xinZengKeHu) {
    for (var i = 0; i < data.xinZengKeHu.length; i++) {
      b.data[i] = data.xinZengKeHu[i].numInv;
    }    
  }
  a.name = '复投用户';
  a.type = 'line';
  b.name = '首投用户';
  b.type = 'line';
  op.series.push(a,b);
}


/**
 * 人均投资
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getRjtzChart() {
  var rjtz = getData(rjtzUrl,date);
  var dataRjtzDay = rjtz.ri;
  var dataRjtzMon = rjtz.yue;

  getRjtz(opRjtzDay,dataRjtzDay);
  getRjtz(opRjtzMon,dataRjtzMon);

  var chart1 = echarts.init(document.getElementById('rjtzDay'));
  $("#rjtzDay").css({
    height: '280px',
    width: _echart_width
  });
  chart1.resize();
  chart1.setOption(opRjtzDay);

  var chart2 = echarts.init(document.getElementById('rjtzMon'));
  $("#rjtzMon").css({
    height: '280px',
    width: _echart_width
  });
  chart2.resize();
  chart2.setOption(opRjtzMon);
}

function getRjtz(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('初投客户人均金额','客均投资额');
  var ctrj = {};
  var kjje = {};
  ctrj.data = [];
  kjje.data = [];
  for (var i = 0; i < data.keJunChuTouKeHuRenJunJinE.length; i++) {
    ctrj.data[i] = data.keJunChuTouKeHuRenJunJinE[i].operativeCustZx.num;
    op.xAxis.data[i] = data.keJunChuTouKeHuRenJunJinE[i].operativeCustZx.datDt;
  }
  for (var i = 0; i < data.keJunTouZiJinE.length; i++) {
    kjje.data[i] = data.keJunTouZiJinE[i].operativeCustZx.num;
  }
  ctrj.name = '初投客户人均金额';
  ctrj.type = 'line';
  kjje.name = '客均投资额';
  kjje.type = 'line';
  op.series.push(ctrj,kjje);
}


/**
 * 新增注册数
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getRegChart() {
  var regist = getData(registUrl,date);
  var dataRegistDay = regist.ri;
  var dataRegistMon = regist.yue;

  getReg(opRegistDay,dataRegistDay);
  getReg(opRegistMon,dataRegistMon);

  var backfundTable = echarts.init(document.getElementById('xinzeng'));
  $("#xinzeng").css({
    height: '280px',
    width: _echart_width
  });
  backfundTable.resize();
  backfundTable.setOption(opRegistDay);

  var backfundTable2 = echarts.init(document.getElementById('xinzengMon'));
  $("#xinzengMon").css({
    height: '280px',
    width: _echart_width
  });
  backfundTable2.resize();
  backfundTable2.setOption(opRegistMon);

}

function getReg(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('注册数','一日转化','七日转化');
  var zcs = {};
  var yrzh = {};
  var qrzh = {};
  zcs.data = [];
  yrzh.data = [];
  qrzh.data = [];
  for (var i = 0; i < data.zhuCeShu.length; i++) {
    zcs.data[i] = data.zhuCeShu[i].operativeCustZx.num;
    op.xAxis.data[i] = data.zhuCeShu[i].operativeCustZx.datDt;
  }
  for (var i = 0; i < data.yiRiZhuanHua.length; i++) {
    yrzh.data[i] = (data.yiRiZhuanHua[i].operativeCustZx.num*100).toFixed(2);
  }
  for (var i = 0; i < data.qiRiZhuanHua.length; i++) {
    qrzh.data[i] = (data.qiRiZhuanHua[i].operativeCustZx.num*100).toFixed(2);
  }
  op.yAxis = [
    {
      name: '注册数',
      type: 'value',
      yAxis: 1,
      position: 'left'
    },
    {
      name: '一日转化,七日转化',
      type: 'value',
      min: 0,
      max: 'dataMax',
      yAxisIndex: 1,
      position: 'right',
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ];

  zcs.name = '注册数';
  zcs.type = 'line';
  yrzh.name = '一日转化';
  yrzh.type = 'line';
  yrzh.yAxisIndex = 1;
  qrzh.name = '七日转化';
  qrzh.type = 'line';
  qrzh.yAxisIndex = 1;
  
  op.series.push(zcs,yrzh,qrzh);
}



/**
 * 回款
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getHkChart() {
  var hk = getData(hkUrl,date);
  var dataHkDay = hk.ri;
  var dataHkMon = hk.yue;

  getHk(opHkDay,dataHkDay);
  getHk(opHkMon,dataHkMon);

  var backfundTable = echarts.init(document.getElementById('backfundTable'));
  $("#backfundTable").css({
    height: '280px',
    width: _echart_width
  });
  backfundTable.resize();
  
  backfundTable.setOption(opHkDay);

}

function getHk(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('活期赎回','活期复投','月月牛赎回','定期到期');
  var hqsh = {};
  var hqft = {};
  var yynsh = {};
  var dqdq = {};
  hqsh.data = [];
  hqft.data = [];
  yynsh.data = [];
  dqdq.data = [];
  for (var i = 0; i < data.huoQiShuHui.length; i++) {
    hqsh.data[i] = data.huoQiShuHui[i].operativeCash.amountCash;
    op.xAxis.data[i] = data.huoQiShuHui[i].operativeCash.datDt;
  }
  for (var i = 0; i < data.huoQiFuTou.length; i++) {
    hqft.data[i] = data.huoQiFuTou[i].operativeCash.amountCash;
  }
  for (var i = 0; i < data.yueYueNiuShuHui.length; i++) {
    yynsh.data[i] = data.yueYueNiuShuHui[i].operativeCash.amountCash;
  }
  for (var i = 0; i < data.dingQiHuiKuan.length; i++) {
    dqdq.data[i] = data.dingQiHuiKuan[i].operativeCash.amountCash;
  }
  op.yAxis.axisLabel = {};
  op.yAxis.axisLabel.formatter = function(value,index) {
    return getUnit(value);
  };
  hqsh.name = '活期赎回';
  hqsh.type = 'line';
  hqft.name = '活期复投';
  hqft.type = 'line';
  yynsh.name = '月月牛赎回';
  yynsh.type = 'line';
  dqdq.name = '定期到期';
  dqdq.type = 'line';
  op.series.push(hqsh,hqft,yynsh,dqdq);
}


/**
 * 年化系数
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getNhxsChart() {
  var nhxs = getData(nhxsUrl,date);
  var dataNhxsDay = nhxs.ri;
  var dataNhxsMon = nhxs.yue;

  getNhxs(opNhxsDay,dataNhxsDay);
  getNhxs(opNhxsMon,dataNhxsMon);

  var yearratioTable = echarts.init(document.getElementById('yearratioTable'));
  $("#yearratioTable").css({
    height: '280px',
    width: _echart_width
  });
  yearratioTable.resize();
  yearratioTable.setOption(opNhxsDay);
}

function getNhxs(op,data) {
  op.series.splice(0, op.series.length);
  op.legend.data.splice(0, op.legend.data.length);
  op.title.text = '';
  op.legend.data.push('年化系数','成交金额','年化金额');
  var nhxs = {};
  var nhje = {};
  var cjje = {};
  nhxs.data = [];
  nhje.data = [];
  cjje.data = [];
  for (var i = 0; i < data.nianHuaXiShu.length; i++) {
    nhxs.data[i] = (data.nianHuaXiShu[i].annualizedCoefficient.amt*100).toFixed(2);
    op.xAxis.data[i] = data.nianHuaXiShu[i].annualizedCoefficient.datDt;
  }
  for (var i = 0; i < data.chengJiaoJinE.length; i++) {
    cjje.data[i] = data.chengJiaoJinE[i].annualizedCoefficient.amt;
  }
  for (var i = 0; i < data.nianHuaJinE.length; i++) {
    nhje.data[i] = data.nianHuaJinE[i].annualizedCoefficient.amt;
  }
  op.yAxis = [
    {
      name: '年化金额，成交金额',
      type: 'value',
      position: 'left',
      yAxis: 1,
      axisLabel: {
        formatter: function(value,index) {
          return getUnit(value);
        }
      }
    },
    {
      name: '年化系数',
      type: 'value',
      min: 0,
      max: 100,
      position: 'right',
      yAxisIndex: 1,
      axisLabel: {
        formatter: '{value}%'
      }
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
function total() {
  var all = getData(totalUrl,date);
	$("#cjnum").html(all.vamountCj);
	$("#jlrnum").html(all.vamountJlr);
	$("#ctcnum").html(all.vamountCtc);
	$("#dsnum").html(all.vamountDs);
	$("#xknum").html(all.vnumNewCustomer);
}

/**
 * 信息提示
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getInfo() {
  var info = getInfoData(infoUrl,date,'在线','运营详情');
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
          getInfo();
          total();
          getNhxsChart();
          getHkChart();
          getRegChart();
          getRjtzChart();
          getKhzlChart();
          getTzsjChart();
          getQdlyChart();
          getQdzhChart();
          getWtzChart();
          getZjctChart();
        }
          document.getElementById('loading').style.display = 'none';
      });
    }, false);
  });
})(mui);



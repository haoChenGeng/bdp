var _echart_width=$(document.body).width();
(function(){
	operate_day_echarts();
	
})();

function operate_day_echarts(){
	/***
	 * 批核金额
	 */
	var batchfundTable = echarts.init(document.getElementById('batchfundTable'));
	$("#batchfundTable").css({ height: '280px',width:_echart_width});
	batchfundTable.resize();
		var	batchfundTable_option = {
		    title: {},
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['天天牛','月月牛','3月内','3-6月','6-9月','9-12月','12月以上']
		    },
		    toolbox: {
		        feature: {
		            
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['六月','七月','八月','九月','十月','十一月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel: {
		                  show: true,
		                  interval: 'auto',
		                  formatter: '{value} %'
		          		}
		        }
		    ],
		    series : [
		        {
		            name:'天天牛',
		            type:'line',
		            data:[7, 8, 11, 12, 9, 13, 11]
		        },
		        {
		            name:'月月牛',
		            type:'line',
		            data:[16, 18, 19, 14, 10, 14, 17]
		        },
		        {
		            name:'3月内',
		            type:'line',
		            data:[25, 22, 20, 24, 25, 22, 21]
		        },
		        {
		            name:'3-6月',
		            type:'line',
		            data:[30, 32, 31, 29, 30, 31, 33]
		        },
		        {
		            name:'6-9月',
		            type:'line',
		            data:[34, 35, 36, 34, 35, 37, 36]
		        },
		        {
		            name:'9-12月',
		            type:'line',
		            data:[22, 31, 11, 14, 12, 22, 20]
		        }
		        ,
		        {
		            name:'12月以上',
		            type:'line',
		            data:[32, 32, 25, 31, 14, 30, 20]
		        }
		    ]
		};
		batchfundTable.setOption(batchfundTable_option);
	/***
	 * 审批通过率
	 */
	var approvalpassTable = echarts.init(document.getElementById('approvalpassTable'));
	$("#approvalpassTable").css({ height: '280px',width:_echart_width});
	approvalpassTable.resize();
		var	approvalpassTable_option = {
		    title: {},
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['天天牛','月月牛','3月内','3-6月','6-9月','9-12月','12月以上']
		    },
		    toolbox: {
		        feature: {
		            
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['六月','七月','八月','九月','十月','十一月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel: {
		                  show: true,
		                  interval: 'auto',
		                  formatter: '{value} %'
		          		}
		        }
		    ],
		    series : [
		        {
		            name:'天天牛',
		            type:'line',
		            data:[7, 8, 11, 12, 9, 13, 11]
		        },
		        {
		            name:'月月牛',
		            type:'line',
		            data:[16, 18, 19, 14, 10, 14, 17]
		        },
		        {
		            name:'3月内',
		            type:'line',
		            data:[25, 22, 20, 24, 25, 22, 21]
		        },
		        {
		            name:'3-6月',
		            type:'line',
		            data:[30, 32, 31, 29, 30, 31, 33]
		        },
		        {
		            name:'6-9月',
		            type:'line',
		            data:[34, 35, 36, 34, 35, 37, 36]
		        },
		        {
		            name:'9-12月',
		            type:'line',
		            data:[22, 31, 11, 14, 12, 22, 20]
		        }
		        ,
		        {
		            name:'12月以上',
		            type:'line',
		            data:[32, 32, 25, 31, 14, 30, 20]
		        }
		    ]
		};
		approvalpassTable.setOption(approvalpassTable_option);
	/***
	 * 待还
	 */
	var listpassTable = echarts.init(document.getElementById('listpassTable'));
	$("#listpassTable").css({ height: '280px',width:_echart_width});
	listpassTable.resize();
		var	listpassTable_option = {
		    title: {},
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['天天牛','月月牛','3月内','3-6月','6-9月','9-12月','12月以上']
		    },
		    toolbox: {
		        feature: {
		            
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['六月','七月','八月','九月','十月','十一月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel: {
		                  show: true,
		                  interval: 'auto',
		                  formatter: '{value} %'
		          		}
		        }
		    ],
		    series : [
		        {
		            name:'天天牛',
		            type:'line',
		            data:[7, 8, 11, 12, 9, 13, 11]
		        },
		        {
		            name:'月月牛',
		            type:'line',
		            data:[16, 18, 19, 14, 10, 14, 17]
		        },
		        {
		            name:'3月内',
		            type:'line',
		            data:[25, 22, 20, 24, 25, 22, 21]
		        },
		        {
		            name:'3-6月',
		            type:'line',
		            data:[30, 32, 31, 29, 30, 31, 33]
		        },
		        {
		            name:'6-9月',
		            type:'line',
		            data:[34, 35, 36, 34, 35, 37, 36]
		        },
		        {
		            name:'9-12月',
		            type:'line',
		            data:[22, 31, 11, 14, 12, 22, 20]
		        }
		        ,
		        {
		            name:'12月以上',
		            type:'line',
		            data:[32, 32, 25, 31, 14, 30, 20]
		        }
		    ]
		};
		listpassTable.setOption(listpassTable_option);
}

var marqueeWarn = mui('#marqueeWarn')[0];
var marqueeSpot = mui('#marqueeSpot')[0];
var marqueeMark = mui('#marqueeMark')[0];

marqueeWord(marqueeWarn);
marqueeWord(marqueeSpot);
marqueeWord(marqueeMark);
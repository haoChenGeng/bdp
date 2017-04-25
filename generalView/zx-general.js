var _echart_width=$(document.body).width();
(function(){
	operate_day_echarts();
	
})();

function operate_day_echarts(){
	/***
	 * 年化系数
	 */
	var yearratioTable = echarts.init(document.getElementById('yearratioTable'));
	$("#yearratioTable").css({ height: '280px',width:_echart_width});
	yearratioTable.resize();
		var	yearratioTable_option = {
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
		yearratioTable.setOption(yearratioTable_option);
	/***
	 * 回款
	 */
	var backfundTable = echarts.init(document.getElementById('backfundTable'));
	$("#backfundTable").css({ height: '280px',width:_echart_width});
	backfundTable.resize();
		var	backfundTable_option = {
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
		backfundTable.setOption(backfundTable_option);
	/***
	 * 待还
	 */
	var waitbackTable = echarts.init(document.getElementById('waitbackTable'));
	$("#waitbackTable").css({ height: '280px',width:_echart_width});
	waitbackTable.resize();
		var	waitbackTable_option = {
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
		waitbackTable.setOption(waitbackTable_option);
}

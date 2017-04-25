var _echart_width=$(document.body).width();

(function(){
	myecharts();
	outo_tab();
	
	//监控tab选项卡切换事件
	mui(".mui-segmented-control").on('tap','.mui-control-item',function(){
		
	})
})();

function myecharts(){
	/***
	 * 总图
	 */
	var chartTotal = echarts.init(document.getElementById('chartTotal'));
	$("#chartTotal").css({ height: '280px',width:_echart_width});
	chartTotal.resize();
	var chartTotal_option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['天天牛','月月牛','1-3个月','3-6个月','6-9个月','9-12个月','12个月以上']
		    },
		    series: [
		        {
		            name:'营业额度',
		            type:'pie',
		            radius: ['40%', '56%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '30',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:15, name:'天天牛'},
		                {value:15, name:'月月牛'},
		                {value:15, name:'1-3个月'},
		                {value:15, name:'3-6个月'},
		                {value:15, name:'6-9个月'},
		                {value:15, name:'9-12个月'},
		                {value:15, name:'12个月以上'},
		                
		            ]
		        }
		    ]
		};
		chartTotal.setOption(chartTotal_option); 
		
		/***
		 * 月KPI达成率
		 */
		var kpiTable = echarts.init(document.getElementById('kpiTable'));
		$("#kpiTable").css({ height: '280px',width:_echart_width});
		kpiTable.resize();
		var	kpiTable_option = {
		    title: {
		        /*text: '月KPI达成率'*/
		    },
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
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
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
		kpiTable.setOption(kpiTable_option);
		
		/***
		 * 月成交趋势
		 */
		var moonTable = echarts.init(document.getElementById('moonTable'));
		$("#moonTable").css({ height: '280px',width:_echart_width});
		moonTable.resize();
		var	moonTable_option = {
		    title: {
		        /*text: '月KPI达成率'*/
		    },
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
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['201605','201606','201607','201608','201609']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitNumber :7
		        }
		    ],
		    series : [
		        {
		            name:'天天牛',
		            type:'line',
		            data:[70, 80, 110, 120, 90, 130, 110]
		        },
		        {
		            name:'月月牛',
		            type:'line',
		            data:[126, 138, 139, 124, 101, 124, 117]
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
		moonTable.setOption(moonTable_option);
		
		/***
		 * 周成交
		 */
		var weekTable = echarts.init(document.getElementById('weekTable'));
		$("#weekTable").css({ height: '280px',width:_echart_width});
		weekTable.resize();
		var weekTable_option = {
		    title: {
		        text: '',
		        subtext: ''
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        data:['天天牛','月月牛','3月内','3-6月','6-9月','9-12月','12月以上']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        boundaryGap: [0, 0.01],
		        axisLabel: {
		            show: true,
		            interval: 'auto',
		            formatter: '{value} %'
          		}
		    },
		    yAxis: {
		        type: 'category',
		        data: ['年累计','月累计','当日']
		    },
		    series: [
		        {
		            name: '天天牛',
		            type: 'bar',
		            data: [20, 89, 34]
		        },
		        {
		            name: '月月牛',
		            type: 'bar',
		            data: [15, 28, 30]
		        },
		        {
		            name: '3月内',
		            type: 'bar',
		            data: [19, 23, 31]
		        },
		        {
		            name: '3-6月',
		            type: 'bar',
		            data: [10, 22, 11]
		        },
		        {
		            name: '6-9月',
		            type: 'bar',
		            data: [19, 23, 30]
		        },
		        {
		            name: '9-12月',
		            type: 'bar',
		            data: [15, 38, 30]
		        },
		        {
		            name: '12月以上',
		            type: 'bar',
		            data: [19, 23, 31]
		        }		
		    ]
		};
		weekTable.setOption(weekTable_option);
		
		/***
		 * 当日
		 */
		var dayTable = echarts.init(document.getElementById('dayTable'));
		$("#dayTable").css({ height: '280px',width:_echart_width});
		dayTable.resize();
		var	dayTable_option = {
		    title: {
		        /*text: '月KPI达成率'*/
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['上上周','上周','本周']
		    },
		    toolbox: {
		        feature: {
		            
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['周日','周一','周二','周三','周四','周五','周六']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitNumber :4,
		            axisLabel: {
		            show: true,
		            interval: 'auto',
		            formatter: '{value} 亿'
          		}
		        }
		    ],
		    series : [
		        {
		            name:'上上周',
		            type:'line',
		            data:[1.4, 0.5, 1.6, 1.4, 1.5, 1.7, 1.6]
		        },
		        {
		            name:'上周',
		            type:'line',
		            data:[1.2, 1.1, 1.1, 1.4, 1.2, 1.2, 1.0]
		        }
		        ,
		        {
		            name:'本周',
		            type:'line',
		            data:[0.2, 1.2, 0.5, 1.1, 1.4, 1.0, 1.1]
		        }
		    ]
		};
		dayTable.setOption(dayTable_option);
}

function outo_tab(){
	var width=$(".me-segmented-control").width();
	$(".me-control-item").css("width",width/4)
}

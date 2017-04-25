var _echart_width = $(document.body).width();
var articleListUrl = "market/articleList";
(function() {
    ps_echarts();
    auto_arrow();
    getArticleListData(articleListUrl);
})();

function ps_echarts() {
    /***
     * 批核金额
     */
    var psindexTable = echarts.init(document.getElementById('psindexTable'));
    $("#psindexTable").css({ height: '280px', width: _echart_width });
    psindexTable.resize();
    var psindexTable_option = {
        title: {},
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        toolbox: {
            feature: {

            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['六月', '七月', '八月', '九月', '十月', '十一月']
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
            }
        }],
        series: [{
            name: '天天牛',
            type: 'line',
            data: [7, 8, 11, 12, 9, 13, 11]
        }, {
            name: '月月牛',
            type: 'line',
            data: [16, 18, 19, 14, 10, 14, 17]
        }, {
            name: '3月内',
            type: 'line',
            data: [25, 22, 20, 24, 25, 22, 21]
        }, {
            name: '3-6月',
            type: 'line',
            data: [30, 32, 31, 29, 30, 31, 33]
        }, {
            name: '6-9月',
            type: 'line',
            data: [34, 35, 36, 34, 35, 37, 36]
        }, {
            name: '9-12月',
            type: 'line',
            data: [22, 31, 11, 14, 12, 22, 20]
        }, {
            name: '12月以上',
            type: 'line',
            data: [32, 32, 25, 31, 14, 30, 20]
        }]
    };
    psindexTable.setOption(psindexTable_option);

    /***
     * 理财
     */
    var userAttenTable = echarts.init(document.getElementById('userAttenTable'));
    $("#userAttenTable").css({ height: '280px', width: _echart_width });
    userAttenTable.resize();
    var markLineOpt = {};
    var userAttenTable_option = {
        backgroundColor: '',
        title: {},
        xAxis: [{
            show: false,
            min: 0,
            max: 300,
            splitNumber: 8
        }],
        yAxis: [{
            show: false,
            min: 0,
            max: 300,
            splitNumber: 8
        }],
        series: [{
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 12,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#999'
                        },
                        position: [-20, 12]
                    },

                },
                textStyle: {
                    fontSize: 10
                },
                itemStyle: {
                    normal: {
                        color: '#EA8269',
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9,
                        fontSize: 10
                    },

                },

                data: [
                    [10, 290, '小牛资本2017校园招聘'],
                    [-5, 180, '小牛分期'],
                    [-10, 130, '小牛资本员工工资'],
                    [-5, 80, '小牛金服'],

                    [100, 150, '小牛资本'],
                    [180, 195, '小牛资本集团'],
                    [180, 100, '小牛资本官网'],
                    [220, 260, '小牛资本怎么样'],
                    [200, 30, '小牛资本校园招聘'],
                    [230, 310, '小牛资本招聘'],
                    [220, -10, '小牛资本校招'],


                    [300, 120, '小牛普惠'],
                    [290, 70, '深圳小牛资本']
                ],

            }, {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 12,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#999'
                        },
                        position: [-5, 12]
                    },

                },
                itemStyle: {
                    normal: {
                        color: '#EA8269',
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9
                    },

                },

                data: [
                    [110, 310, '集团'],
                    [290, 300, '电子'],
                    [300, 190, '校园'],
                ],

            },

            {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 40,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        }
                    },

                },
                itemStyle: {
                    normal: {
                        // color:'#5aa8ee',
                        color: function(param) {
                            return param.data[3];
                        },
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9

                    },

                },

                data: [
                    [150, 150, '小牛资本', '#7488D1']
                ],
                markLine: markLineOpt
            }, {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 12,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#999'
                        },
                        position: [-5, 12]
                    },

                },
                itemStyle: {
                    normal: {
                        color: function(param) {
                            return param.data[3];
                        },
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9

                    },

                },

                data: [
                    [3, 240, '骗局', '#56B490'],
                    [180, 320, '同洲', '#56B490'],
                    [300, 250, '官网', '#56B490']
                ],
                markLine: markLineOpt
            }, {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 20,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#333'
                        },
                        position: [0, 18]
                    },

                },
                itemStyle: {
                    normal: {
                        color: function(param) {
                            return param.data[3];
                        },
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9

                    },

                },

                data: [
                    [50, 240, '在线', '#EA8269']
                ],
                markLine: markLineOpt
            }, {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 30,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#333'
                        },
                        position: [2, 27]
                    },

                },
                itemStyle: {
                    normal: {
                        color: function(param) {
                            return param.data[3];
                        },
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9

                    },

                },

                data: [
                    [40, 80, '招聘', '#EA8269']
                ],
                markLine: markLineOpt
            }, {
                name: '',
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'circle',
                symbolSize: 30,
                label: {
                    normal: {
                        show: true,
                        formatter: function(param) {
                            return param.data[2];
                        },
                        textStyle: {
                            color: '#333'
                        },
                        position: [-5, 27]
                    },

                },
                itemStyle: {
                    normal: {
                        color: function(param) {
                            return param.data[3];
                        },
                        shadowColor: 'rgba(0,0,139, 0.8)',
                        shadowBlur: 15,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.9

                    },

                },

                data: [
                    [140, 70, '小牛在线', '#56B490']
                ],
                markLine: markLineOpt
            }, {
                name: '',
                type: 'pie',
                radius: ['0', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#DBE0F3'
                        }, {
                            offset: 0.25,
                            color: '#DBE0F3'
                        }, {
                            offset: 0.50,
                            color: '#DBE0F3'
                        }, {
                            offset: 0.75,
                            color: '#DBE0F3'
                        }, {
                            offset: 1,
                            color: '#DBE0F3'
                        }], false),
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 335,
                        name: '直接访问'
                    },

                ]
            },

            {
                name: '',
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#E2E8F4'
                        }], false),
                    },
                },

                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 3235,
                        name: '直接访问'
                    },


                ]
            },

            {
                name: '',
                type: 'pie',
                radius: ['90%', '130%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#F0F3FC'
                        }, {
                            offset: 1,
                            color: '#F0F3FC'
                        }], false),
                    },
                },

                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 3235,
                        name: '直接访问'
                    },


                ]
            }

        ]
    };
    userAttenTable.setOption(userAttenTable_option);
}

function auto_arrow() {
    var left = ($(".arrow-active").width() - 20) / 2
    $(".arrowtop").css("left", left + "px");
}

function getArticleListData(url) {
    var articleListData = getArticle(url, 0, 1, 10);
    var articleList = articleListData.articleList;
    var itemul = document.getElementById("csfinanceList");

    for (var i = 0; i < articleList.length; i++) {
        var item = articleList[i];

        var icon = document.createElement("span");
        icon.className = "me-icon roll";

        var title = document.createElement("span");
        title.innerHTML = item.marketArticle.title;
        title.className = "csfinance-txt";

        var itemli = document.createElement("li");
        itemli.className = "mui-table-view-cell csfinance-list-item";
        itemli.dataset.content = item.marketArticle.content;
        itemli.dataset.title = item.marketArticle.title;
        itemli.dataset.date = item.vcreateDate;
        itemli.dataset.userName = item.marketArticle.userName;

        itemli.appendChild(icon);
        itemli.appendChild(title);

        itemul.appendChild(itemli);
    }
    itemul.addEventListener('click', function(e) {
    var target = e.target || e.srcElement;
    // alert(target.nodeName);
    if (target.nodeName == 'LI' || target.nodeName == 'SPAN') {
      articleInfo(target.dataset.content, target.dataset.title, target.dataset.date, target.dataset.userName);
    }
  });
}

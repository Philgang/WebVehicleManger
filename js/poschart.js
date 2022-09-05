// import * as echarts from 'echarts';

var chartDom = document.getElementById('poschart');
var myChart = echarts.init(chartDom, 'dark');

var chartDom = document.getElementById('velocitychart');
var veChart = echarts.init(chartDom, 'dark');

var chartDom = document.getElementById('accleratechart');
var accChart = echarts.init(chartDom, 'dark');

var option;
option = {
    grid: {
        top:'10%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    tooltip:{
        trigger:'axis',
    },

    backgroundColor:'' ,
    xAxis: {
      type: 'category',
      data: [1, 2, 3,4, 5, 6, 7],
      name:'Position:X',
      nameLocation:'end'
    },
    yAxis: {
      type: 'value',
      name:'Position:Y',
      nameLocation:'end',
    },
    series: [
      {
        data: [1, 1.5, 2, 1.4, 1.8, 2,2.5],
        type: 'line',
        smooth: true
      }
    ]
  };

option && myChart.setOption(option);
option && veChart.setOption(option);
option && accChart.setOption(option);

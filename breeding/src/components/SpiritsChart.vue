<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted,watch  } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  MarkLineComponent
} from 'echarts/components';
import { PictorialBarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
  PictorialBarChart,
  CanvasRenderer
]);


const chartDom = ref();
let myChart = null;
let resizeObserver = null;
let resizing = false; // 标志位，用于跟踪是否正在调整中

const props = defineProps(['options'])

watch(props,(news,old)=>{
    option.series[0].data = news.options.seriesData
    option.series[1].data = news.options.seriesData
    option.yAxis = news.options.yAxis
    option.legend = news.options.legend
    resizeObserver.disconnect();
    change()
})
const change = ()=>{
    myChart = echarts.init(chartDom.value);
    option && myChart.setOption(option);
    resizeObserver = new ResizeObserver(()=>{
        if (!resizing) {
            resizing = true;
            setTimeout(() => {
                myChart.resize();
                resizing = false;
            }, 10); // 添加延迟时间，例如100毫秒
        }
            
    })
    resizeObserver.observe(chartDom.value);
}

onMounted(()=>{

    change();

})
onUnmounted(() => {
    resizeObserver.disconnect();
});

const spirit ='https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/qing.png';
var maxData = 3000;

const option = reactive({
  title:{
    text:"光照强度"
  },
  tooltip: {},
  xAxis: {
    max: maxData,
    splitLine: { show: false },
    offset: 10,
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    axisLabel: {
      margin: 10
    }
  },
  yAxis: {
    data: ['2013', '2014', '2015', '2016'],
    inverse: true,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      margin: 10,
      color: '#999',
      fontSize: 16
    }
  },
  grid: {
    top: 'center',
    height: 200,
    left: 70,
    right: 100
  },
  series: [
    {
      // current data
      type: 'pictorialBar',
      symbol: spirit,
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbolClip: true,
      symbolSize: 30,
      symbolBoundingData: maxData,
      data: [891, 1220, 660, 1670],
      markLine: {
        symbol: 'none',
        label: {
          formatter: 'max: {c}',
          position: 'start'
        },
        lineStyle: {
          color: 'green',
          type: 'dotted',
          opacity: 0.2,
          width: 2
        },
        data: [
          {
            type: 'max'
          }
        ]
      },
      z: 10
    },
    {
      // full data
      type: 'pictorialBar',
      itemStyle: {
        opacity: 0.2
      },
      label: {
        show: true,
        formatter: function (params) {
          return ((params.value / maxData) * 100).toFixed(1) + ' %';
        },
        position: 'right',
        offset: [10, 0],
        color: 'green',
        fontSize: 18
      },
      animationDuration: 0,
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbol: spirit,
      symbolSize: 30,
      symbolBoundingData: maxData,
      data: [891, 1220, 660, 1670],
      z: 5
    }
  ]
})


</script>

<style>
.chartmain{
    width: 100%;
    height: 100%;
}
</style>
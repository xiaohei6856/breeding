<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted,watch  } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);
const option = reactive({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['养鸡的', '测试', '猪圈', '猪圈']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
        saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['18:24', '18:34', '18:44', '18:54', '19:04', '19:14']
    },
    yAxis: {
      type: 'value',
      name: 'CO2浓度',
      position: 'left',
      axisLabel: {
        formatter: '{value} ppm'
      }
    },
    series: [
        {
        name: '养鸡的',
        type: 'line',
        stack: '0',
        data: [2398, 2092, 1840, 1620, 2383, 1983]
        },
        {
        name: '测试',
        type: 'line',
        stack: '1',
        data: [2398, 2092, 1840, 1620, 2383, 1983]
        },
        {
        name: '猪圈',
        type: 'line',
        stack: '2',
        data: [2070, 2131, 1767, 2100, 913, 1849]
        },
        {
        name: '猪圈',
        type: 'line',
        stack: '3',
        data: [1481, 1595, 2199, 2142, 1965, 2201]
        }
    ]
    })
const props = defineProps(['options'])

watch(props,(news,old)=>{
    option.series = news.options.series
    option.xAxis = news.options.xAxis
    option.legend = news.options.legend
    resizeObserver.disconnect();
    change()
})

const chartDom = ref();
let myChart = null;
let resizeObserver = null;
let resizing = false; // 标志位，用于跟踪是否正在调整中

const change = ()=>{
    const myChart = echarts.init(chartDom.value);
    option && myChart.setOption(option);
    // 根据页面大小自动响应图表大小
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    resizeObserver = new ResizeObserver(()=>{
        if (!resizing) {
            console.log(1234);
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



</script>

<style>
.chartmain{
    width: 100%;
    height: 100%;
}
</style>
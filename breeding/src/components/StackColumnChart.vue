<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted  } from 'vue';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  BarChart,
  CanvasRenderer
]);


const chartDom = ref();
let myChart = null;
let resizeObserver = null;
let resizing = false; // 标志位，用于跟踪是否正在调整中

const change = ()=>{
    const myChart = echarts.init(chartDom.value);
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

const option = reactive({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
        type: 'value'
        }
    ],
    series: [
        {
        name: 'Direct',
        type: 'bar',
        emphasis: {
            focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
        name: 'Email',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
        name: 'Union Ads',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
        name: 'Video Ads',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
        name: 'Search Engine',
        type: 'bar',
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
            focus: 'series'
        },
        markLine: {
            lineStyle: {
            type: 'dashed'
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
        }
        },
        {
        name: 'Baidu',
        type: 'bar',
        barWidth: 5,
        stack: 'Search Engine',
        emphasis: {
            focus: 'series'
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
        name: 'Google',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
            focus: 'series'
        },
        data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
        name: 'Bing',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
            focus: 'series'
        },
        data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
        name: 'Others',
        type: 'bar',
        stack: 'Search Engine',
        emphasis: {
            focus: 'series'
        },
        data: [62, 82, 91, 84, 109, 110, 120]
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
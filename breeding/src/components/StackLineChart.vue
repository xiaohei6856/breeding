<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted  } from 'vue';
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

const option = reactive({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
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
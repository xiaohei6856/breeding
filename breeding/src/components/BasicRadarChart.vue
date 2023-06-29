<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted,watch  } from 'vue';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);


const chartDom = ref();
let myChart = null;
let resizeObserver = null;
let resizing = false; // 标志位，用于跟踪是否正在调整中

const props = defineProps(['options'])

watch(props,(news,old)=>{
    option.series[0].data = news.options.series
    option.radar.indicator = news.options.indicator
    option.legend = news.options.legend
    resizeObserver.disconnect();
    change()
})

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
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  tooltip: {
    trigger: 'axis'
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 45 },
      { name: 'Administration', max: 45 },
      { name: 'Information Technology', max: 45 },
      { name: 'Customer Support', max: 45 },
      { name: 'Development', max: 45 },
      { name: 'Marketing', max: 45 }
    ]
  },
  series: [
    {
      name: '温度',
      type: 'radar',
      tooltip: {
        trigger: 'item',
        valueFormatter: value => value + '°C'
      },
      data: []
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
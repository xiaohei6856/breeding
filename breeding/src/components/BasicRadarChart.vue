<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted  } from 'vue';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);


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
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
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
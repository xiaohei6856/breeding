<template>
    <div ref="chartDom" class="chartmain"></div>
</template>

<script setup>
import { ref,reactive,onMounted,onUnmounted,watch  } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { PictorialBarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PictorialBarChart,
  CanvasRenderer
]);


const chartDom = ref();
let myChart = null;
let resizeObserver = null;
let resizing = false; // 标志位，用于跟踪是否正在调整中
const props = defineProps(['options'])
watch(props,(news,old)=>{
    option.legend = news.options.legend
    option.yAxis = news.options.yAxis
    option.series = news.options.series
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
    data: ['2015']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    containLabel: true,
    left: 20
  },
  yAxis: {
    data: ['reindeer', 'ship', 'plane', 'train', 'car'],
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      margin: 30,
      fontSize: 14
    },
    axisPointer: {
      label: {
        show: true,
        margin: 30
      }
    }
  },
  xAxis: {
      type: 'value',
      name: '强度',
      position: 'bottom',
      axisLabel: {
        formatter: '{value} db'
      }
    },
  series: [
    {
      name: '2015',
      type: 'pictorialBar',
      label: {
        show: true,
        position: 'right',
        offset: [10, 0],
        fontSize: 16
      },
      symbolRepeat: true,
      symbolSize: ['80%', '60%'],
      barCategoryGap: '40%',
      data: [
        {
          value: 157,
        },
        {
          value: 21,
        },
        {
          value: 66,
        },
        {
          value: 78,
        },
        {
          value: 123,
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
export default function transition(data) {
    const seriesData = [];
    const yAxisData =[];
    data.forEach((houseData,indev) => {
      houseData.reverse();
        const noise = Math.round(houseData[houseData.length-1].noise);
        seriesData.push({value:noise});
        yAxisData.push(houseData[houseData.length-1].name)
    });
  
    return {
      legend: {
        data: ['音频水平'],
      },
      yAxis: {
        data: yAxisData,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
            margin: 30,
            fontSize: 14
        },
      },
      series:[
        {
          name: '音频水平',
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
          data: seriesData
        }
      ]
    };
  }
  
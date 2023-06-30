export default function spirits(data) {
    const seriesData = [];
    const yAxisData =[];
    data.forEach((houseData,indev) => {
      houseData.reverse();
        const beam = Math.round(houseData[houseData.length-1].beam);
        seriesData.push(beam);
        yAxisData.push(houseData[houseData.length-1].name)
    });
  
    return {
      legend: {
        data: ['光照强度'],
      },
      yAxis: {
        data: yAxisData,
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 10,
          color: '#999',
          fontSize: 16
        }
      },
      seriesData
    };
  }
  
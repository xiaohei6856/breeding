export default function stackline(data) {
    const seriesData = {};
    const xAxisData = [];
  
    data.forEach((houseData,indev) => {
      houseData.reverse();
      houseData.forEach((reading, index) => {
        const houseName = reading.name;
        const time = reading.time.match(/\d{2}:\d{2}/)[0]
        const co2 = Math.round(reading.co2);
  
        if (!seriesData[houseName]) {
          seriesData[houseName] = {
            name: houseName,
            type: 'line',
            stack: houseName+index.toString(),
            data: [],
          };
        }
  
        seriesData[houseName].data.push(co2);
  
        if (indev === 0) {
          xAxisData.push(time);
        }
      });
    });
    const series = Object.values(seriesData);
  
    return {
      title: {
        text: 'CO2(ppm)',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: series.map((seriesItem) => seriesItem.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  }
  
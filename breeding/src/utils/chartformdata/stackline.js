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
      legend: {
        data: series.map((seriesItem) => seriesItem.name),
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      series,
    };
  }
  
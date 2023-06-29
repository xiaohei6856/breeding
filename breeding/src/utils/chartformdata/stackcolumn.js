export default function stackcolumn(data) {
    const seriesData = {};
    const xAxisData = [];
  
    data.forEach((houseData,indev) => {
      houseData.reverse();
      houseData.forEach((reading, index) => {
        const houseName = reading.name;
        const time = reading.time.match(/\d{2}:\d{2}/)[0]
        const oxygen = Math.round(reading.oxygen);
        const ammonia = Math.round(reading.ammonia);
        const humidity = Math.round(reading.humidity);
        if (!seriesData['oxygen'+reading.houseId]) {
          seriesData['oxygen'+reading.houseId] = {
            name: '氧气',
            type: 'bar',
            stack: reading.houseId,
            emphasis: {
              focus: 'series'
            },
            tooltip: {
              trigger: 'item',
              valueFormatter: value => value + '%'
            },
            // label: {
            //   show: true,
            //   formatter: houseName,
            //   position: 'inside'
            // },
            data: [],
          };
        }
        if(!seriesData['ammonia'+reading.houseId]){
          seriesData['ammonia'+reading.houseId] = {
            name: '氨气',
            type: 'bar',
            stack: reading.houseId,
            emphasis: {
              focus: 'series'
            },
            tooltip: {
              trigger: 'item',
              valueFormatter: value => value + '%'
            },
            // label: {
            //   show: true,
            //   formatter: houseName,
            //   position: 'inside'
            // },
            data: [],
          };
        }
        if(!seriesData['humidity'+reading.houseId]){
          seriesData['humidity'+reading.houseId] = {
            name: '湿度',
            type: 'bar',
            stack: reading.houseId,
            emphasis: {
              focus: 'series'
            },
            tooltip: {
              trigger: 'item',
              valueFormatter: value => value + '%'
            },
            label: {
              show: true,
              formatter: houseName,
              position: 'inside',
              rotate:90
            },
            data: [],
          };
        }
  
        seriesData['oxygen'+reading.houseId].data.push(oxygen);
        seriesData['ammonia'+reading.houseId].data.push(ammonia);
        seriesData['humidity'+reading.houseId].data.push(humidity);
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
        data: xAxisData,
      },
      series,
    };
  }
  
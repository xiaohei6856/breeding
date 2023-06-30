export default function basicradar(data) {
    const seriesData = {};
    const indicator = [];
  
    data.forEach((houseData,indev) => {
      houseData.reverse();
      houseData.forEach((reading, index) => {
        const houseName = reading.name;
        const time = reading.time.match(/\d{2}:\d{2}/)[0]
        const temperature = Math.round(reading.temperature);
  
        if (!seriesData[houseName]) {
          seriesData[houseName] = {
            name: houseName,
            value: [],
          };
        }
  
        seriesData[houseName].value.push(temperature);
  
        if (indev === 0) {
            indicator.push({ name: time, max: 45 });
        }
      });
    });
    const series = Object.values(seriesData);
    return {
      indicator,
      legend: {
        data: series.map((seriesItem) => seriesItem.name),
      },
      series,
    };
  }
  
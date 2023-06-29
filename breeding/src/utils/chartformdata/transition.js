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
      yAxisData,
      seriesData
    };
  }
  
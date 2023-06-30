export default function warning(data) {
    const filteredData = []
    data.forEach((houseData,indev) => {
        houseData.forEach((reading, index) => {
            if (reading.warningType) {
                filteredData.push(reading)
            } 
        })
    })
    return {
      filteredData
    };
  }
  
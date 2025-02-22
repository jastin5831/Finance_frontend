export const fillMissingDates = (data, dateRange) => {
    const tempData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < tempData.length; i+=1) {
      const subArray = tempData[i].data;
      const filledSubArray = [];
      let sum = 0;
      for(let j = dateRange.from; j<= dateRange.to; j+=1){
        if(j%100 === 12) {j = j - 12 + 100} 
        const existingObj = subArray.find(item => item.date === j);
        if (existingObj) {
          filledSubArray.push(existingObj);
          sum += existingObj.actual;
        } else {
          filledSubArray.push({ actual: 0, date: j, forecast: 0 });
        }
      }
      tempData[i].data = filledSubArray;
      tempData[i].average = parseFloat((sum/filledSubArray.length).toPrecision(5));
      tempData[i].userInfo = 0;
      tempData[i].result = parseFloat((sum/filledSubArray.length).toPrecision(5));
    }
    return tempData;
  }
  
export const formatData = (datasets, dateRange) => {
    const tableData = new Map();
    datasets.forEach(dataset => {
      dataset.data.forEach(([AccountId, RevenueExpenseId, Description, currentValue, forecastValue]) => {
        const compositeKey = `${AccountId}_${RevenueExpenseId}`;
        if (!tableData.has(compositeKey)) {
          tableData.set(compositeKey, {
            AccountId,
            RevenueExpenseId,
            Description,
            data: []
          });
        }
        tableData.get(compositeKey).data.push({
          date: dataset.date,
          actual: currentValue,
          forecast: forecastValue
        })
      });
    }); 
    const tableDataArray = Array.from(tableData.values())
    const result = fillMissingDates(tableDataArray, dateRange);
    return result
}
  
export const handleData = (data, dateRange) => {
    const tempData = []
    data.forEach(element => {
      const tempItem = {date:'', data:[]}
      tempItem.date = element.dateFlag
      tempItem.data = [...element.data]
      tempData.push(tempItem)
    });
    return formatData(tempData, dateRange);
}
  
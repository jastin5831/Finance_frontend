import axios, { endpoints } from 'src/utils/axios';

export const CreateForecast = async (forecast, coaResult) => {
  const tempData = []
  forecast.data.map(item => {
      const tempItem = [...item]
      tempItem[1] = tempItem[3]
      tempItem[3] = tempItem[2]
      tempItem[4] = 0
      let flag = false;
      coaResult.map(coa => {
          if(coa[0].toString() === tempItem[0]) {
            tempItem[2] = coa[2]; 
            flag = true;
          }
          return true;
      })
      if(flag === true) tempData.push(tempItem)
      return true;
  })
  forecast.data = tempData;
  try {
    let result = ''
    await axios.post(endpoints.forecast.create, forecast)
            .then(res => {result = 'success'})
            .catch(err => {result = 'error'})
    return result;
  } catch (error) {
    console.log("Error Create Forecast", error);
    throw error;
  }
}

export const UpdateForecast = async (forecast) => {
  const tempData = []
  const tempResult = JSON.parse(JSON.stringify(forecast))
  forecast.data.forEach(element => {
    tempData.push([element.AccountId,element.RevenueExpenseId,element.Description,0,element.result])
  });
  tempResult.data = tempData;
  try {
    let result = ''
    await axios.post(endpoints.forecast.update, tempResult)
            .then(res => {result = 'success'})
            .catch(err => {result = 'error'})
    return result
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};

export const GetForecast = async (data) => {
  try {
    let result = {type:'', data:{}}
    await axios.post(endpoints.forecast.get, data)
            .then(res => {result = {type:'success', data:res.data}})
            .catch(err => {result = {type: 'error', data:err}})
    return result;
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};
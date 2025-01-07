import axios, { endpoints } from 'src/utils/axios';

export const CreateForecast = async (forecast, coaResult) => {
  const tempData = []
  forecast.data.map(item => {
      const tempItem = [...item]
      tempItem[3] = tempItem[2]
      tempItem[4] = 0
      coaResult.map(coa => {
          if(coa[0].toString() === tempItem[0]) tempItem[2] = coa[2]; 
          return true;
      })
      tempData.push(tempItem)
      return true;
  })
  forecast.data = tempData;
  console.log('forecast',forecast)
  try {
    await axios.post(endpoints.forecast.create, forecast)
            .then(res => console.log('response', res.data))
            .catch(err => console.log('Error:', err))
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
    await axios.post(endpoints.forecast.update, tempResult)
            .then(res => console.log('response',res.data))
            .catch(err => console.log('error',err))
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};

export const GetForecast = async (data) => {
  try {
    const response = await axios.post(endpoints.forecast.get, data)
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};
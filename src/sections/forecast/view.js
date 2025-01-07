// @mui
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {LoadingButton} from '@mui/lab';
// eslint-disable-next-line import/no-extraneous-dependencies
import { parseInt } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
// eslint-disable-next-line import/order
import { GetForecast, UpdateForecast } from 'src/api/forecast';
import ForecastTable from './ForecastTable';

// ----------------------------------------------------------------------
const monthArray = [
  'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const fillMissingDates = (data, dateRange) => {
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

const formatData = (datasets, dateRange) => {
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

const handleData = (data, dateRange) => {
  const tempData = []
  data.forEach(element => {
    const tempItem = {date:'', data:[]}
    tempItem.date = element.dateFlag
    tempItem.data = [...element.data]
    tempData.push(tempItem)
  });
  return formatData(tempData, dateRange);
}

export default function DataForecast() {
  const settings = useSettingsContext();
  const [selectedDate, setSelectedDate] = useState({from:null, to:null});
  const [result, setResult] = useState([])
  const [header, setHeader] = useState([])
  const [uploadState, setUploadState] = useState(false);
  const {user} = useAuthContext()  
  const [currentDate, setCurrentDate] = useState(dayjs());

  const headerSet = (dataset) => {
    const headerTitle = []
    dataset.forEach((data, index) => {
      const year = parseInt(data.date/100)
      const month = data.date - year*100
      const tempHeader = `${monthArray[month]} ${year}`
      headerTitle.push(tempHeader);
    });
    setHeader(headerTitle)
  }

  const handleDateChange = (date, type) => {
    let dateResult;
    if(type) {
      dateResult = {...selectedDate, from: date}
    } else {
      dateResult = {...selectedDate, to: date}
    }
    setSelectedDate(dateResult)
  };

  const onSubmit = async () => {
    setUploadState(true)
    const saveDate = dayjs(currentDate).format('MMMM YYYY');
    const dateflag = dayjs(currentDate).year()*100 + dayjs(currentDate).month();
    const data = {
      userId: user._id,
      date: saveDate,
      dateFlag: dateflag,
      data: result
    }
    if(!data.data || data.data.length === 0) {
      console.log("Monthly Result data required!")
      setUploadState(false)
    } else {
      await UpdateForecast(data);
      setUploadState(false)
    }
  }

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        if (selectedDate.from !== null && selectedDate.to !== null) {
          const startDate = dayjs(selectedDate.from).year()*100 + dayjs(selectedDate.from).month();
          const endDate = dayjs(selectedDate.to).year()*100 + dayjs(selectedDate.to).month();
          const dateRange = {from:startDate, to:endDate}
          const data = {
            userId: user._id,
            date: dateRange
          }
          const dataResult = await GetForecast(data);
          const tempResult = handleData(dataResult, dateRange);
          setResult(tempResult)
          headerSet(tempResult[0].data)
        }
      } catch (err) {
        console.log("fetchForecast Error:",err)
      }
    };
    fetchForecast();
  }, [selectedDate, user._id]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4"> Forecast</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mr: 4,
            border: '2px solid',
            borderColor: '#007867',
            borderRadius: 1,
            p: 0.2,
          }}
        >
          <DatePicker 
            label={selectedDate.from === "" ? 'From' : ''} 
            views={['month', 'year']} 
            value={selectedDate.from}
            onChange={(e) => handleDateChange(e, true)}
          />
          <Box sx={{ mx: 1 }}>-</Box>
          <DatePicker 
            label={selectedDate.to === "" ? 'To' : ''}  
            views={['month', 'year']} 
            value={selectedDate.to}
            onChange={(e) => handleDateChange(e, false)}
          />
        </Box>
      </Box>
      <ForecastTable 
        currentResult={result} month={header} 
        date={currentDate} 
        setDate = {(date) => setCurrentDate(date)} 
        changeResult = {(data) => setResult(data)}
      />
      <LoadingButton
        component="label"
        color="primary"
        variant="contained"
        onClick={onSubmit}
        loading={uploadState}
        sx = {{mt:2, mb:2}}
        startIcon={<CloudUploadIcon />}
      >
        Submit
      </LoadingButton>
    </Container>
  );
}

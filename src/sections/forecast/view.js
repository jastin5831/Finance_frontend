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
import {toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
// eslint-disable-next-line import/order
import { GetForecast, UpdateForecast } from 'src/api/forecast';
import ForecastTable from 'src/components/forecastTable';
import BalanceSheetAnalysis from 'src/components/balancesheet';
import SwitchButton from './switch';
import { handleData } from './func';

const monthArray = [
  'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

export default function DataForecast() {
  const settings = useSettingsContext();
  const [selectedDate, setSelectedDate] = useState({from:null, to:null});
  const [result, setResult] = useState([])
  const [header, setHeader] = useState([])
  const [uploadState, setUploadState] = useState(false);
  const {user} = useAuthContext()  
  const [currentDate, setCurrentDate] = useState(null);
  const [statement, setStatement] = useState(true);

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
    if (!date) return; 
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
      toast.error('Monthly Result data required!',{theme: "colored"})
      setUploadState(false)
    } else {
      const response = await UpdateForecast(data);
      if(response === 'success') {
        toast.success('Forecast successfully Uploaded!', {theme:'colored'})
      } else {
        toast.error('Update Forecast Error',{theme: "colored"})
      }
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
          const response = await GetForecast(data);
          if(response.type === 'success') {
            toast.success('History successfully loaded!', {theme:'colored'})
          } else {
            toast.error('Update Forecast Error',{theme: "colored"})
          }
          const tempResult = handleData(response.data, dateRange);
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
        <Typography variant="h4"> 
          {statement === true ? "Forecast IncomeStatement" : "Analysis BalanceSheet"} 
        </Typography>
        <SwitchButton statement={statement} setState={(data) => setStatement(data)}/>
      </Box>
      <Box>
        {statement === true ? 
          <ForecastTable 
            currentResult={result} month={header} 
            date={currentDate} selectedDate={selectedDate}
            handleDateChange = {handleDateChange}
            setDate = {(date) => setCurrentDate(date)}
            changeResult = {(data) => setResult(data)}
          />
          :
          <BalanceSheetAnalysis />
        }
      </Box>
      <Box>
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
      </Box>
    </Container>
  );
}

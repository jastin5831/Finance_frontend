import { useEffect, useState } from 'react';
// components
import { Box, Container, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {CreateRevenue, GetRevenue, GetCOA } from 'src/api/revenue';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import { CreateForecast } from 'src/api/forecast';
import UploadFile from 'src/components/table/uploadFile';
import './style.css';

const monthTitle = [
  "AccountID", "Revenue/Expense Description", "Amount($)", "Revenue/Expense ID"
]

export default function TransactionUpload() {
  const settings = useSettingsContext();
  const {user} = useAuthContext();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [result, setResult] = useState([]);
  const [COAResult, setCOAResult] = useState([]);
  const [uploadState, setUploadState] = useState(false);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleSetResult = (value) => {
    const aggregatedData = Object.values(
      value.reduce((acc, item) => {
        const key = item[3]; 
        if (!acc[key]) {
          acc[key] = [...item]; 
        } else {
          acc[key][2] += item[2];
        }
        return acc;
      }, {})
    );
    
    setResult(aggregatedData)
  }

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
      const resRev = await CreateRevenue(data)
      if(resRev.type === "success") {
        toast.success('Revenue Successfully Uploaded',{theme: "colored"})
        setResult(resRev.data);
      }else {
        toast.error('Revenue Upload Error',{theme: "colored"})
      }
      const resFore = await CreateForecast(data, COAResult);
      if(resFore === "success") {
        toast.success('Forecast Successfully Uploaded',{theme: "colored"})
      }else {
        toast.error('Forecast Upload Error',{theme: "colored"})
      }
      setUploadState(false)
    }
  }

  useEffect(()=>{
    const getRevenue = async () => {
      const saveDate = dayjs(currentDate).format('MMMM YYYY');
      const data = {userId: user._id, date: saveDate}
      const response = await GetRevenue(data)
      if(response.type === "success") {
        toast.success("Revenue Successfully Upload!",{theme: "colored"});
        setResult(response.data);
      }else {
        toast.error('Revenue Upload Error', {theme: "colored"})
      }
    }
    const getCOA = async () => {
      const data = {userId: user._id}
      const response = await GetCOA(data)
      if(response.type === "success") {
        toast.success("COA Successfully Upload!",{theme: "colored"});
        setCOAResult(response.data);
      }else {
        toast.error('COA Upload Error', {theme: "colored"})
      }
    }

    getCOA()
    getRevenue()
  },[currentDate, user._id])
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4"> Upload Transactions </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mr: 4,
            border: '2px solid',
            borderColor: '#007867',
            borderRadius: 1,
            p: 0.2,
          }}
        >
          <DatePicker views={['month', 'year']}  value={currentDate} onChange={handleDateChange}/>
        </Box>
      </Box>

      <UploadFile onSetResult={handleSetResult} currentResult={result} titleArray={monthTitle}/>

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

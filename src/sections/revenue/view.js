import { useEffect, useState } from 'react';
// components
import { Box, Container, Divider, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios, { endpoints } from 'src/utils/axios';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import UploadFile from './uploadFile';
import './style.css';
// ----------------------------------------------------------------------
const monthTitle = [
  "AccountID", "Revenue/Expense Description", "Amount($)", "Revenue/Expense ID"
]
const COATitle = [
  "AccountID", "Description", "Roll UP"
]
export default function UploadResult() {
  const settings = useSettingsContext();
  const {user} = useAuthContext();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [result, setResult] = useState([]);
  const [COAResult, setCOAResult] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [uploadCOA, setUploadCOA] = useState(false);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleSetResult = (value) => {
    setResult(value)
  }

  const handleSetCOAResult = (value) => {
    setCOAResult(value)
  }

  const onSubmit = async () => {
    setUploadState(true)
    const saveDate = dayjs(currentDate).format('MMMM YYYY');
    const data = {
      userId: user._id,
      date: saveDate,
      data: result
    }
    if(!data.data || data.data.length === 0) {
      console.log("data required!")
      setUploadState(false)
    } else {
      await axios.post(endpoints.revenue.create, data)
              .then(res => {
                console.log(res.data)
                setUploadState(false)
              })
              .catch(err => {
                setUploadState(false)
                console.log(err)
              })
    }
  }

  const onCOASubmit = async () => {
    setUploadCOA(true)
    const data = {
      userId: user._id,
      data: COAResult
    }
    if(!data.data || data.data.length === 0) {
      console.log("data required!")
      setUploadCOA(false)
    } else {
      await axios.post(endpoints.coa.create, data)
              .then(res => {
                console.log(res.data)
                setUploadCOA(false)
              })
              .catch(err => {
                setUploadCOA(false)
                console.log(err)
              })
    }
  }

  useEffect(()=>{
    const getRevenue = async () => {
      const saveDate = dayjs(currentDate).format('MMMM YYYY');
      const data = {userId: user._id, date: saveDate}
      await axios.post(endpoints.revenue.getRevenue, data)
              .then(res => {
                setResult(res.data.data.data);
              })
              .catch(err => {
                setResult([])
              })
    }

    const getCOA = async () => {
      const data = {userId: user._id}
      await axios.post(endpoints.coa.getCOA, data)
              .then(res => {
                setCOAResult(res.data.data.data);
              })
              .catch(err => {
                setCOAResult([])
              })
    }
    getRevenue()
    getCOA()
  },[currentDate, user._id])
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Typography variant="h4"> Upload Monthly Result </Typography>
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
          <DatePicker value={currentDate} onChange={handleDateChange}/>
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

      <Divider sx={{ borderStyle: 'dashed', mb:2 }} />

      <Typography variant="h4" sx={{mb:2}}> Upload Chart of Account </Typography>
      <UploadFile onSetResult={handleSetCOAResult} currentResult={COAResult} titleArray={COATitle}/>
      <LoadingButton
        component="label"
        color="primary"
        variant="contained"
        onClick={onCOASubmit}
        loading={uploadCOA}
        sx = {{mt:2, mb:2}}
        startIcon={<CloudUploadIcon />}
      >
        Submit COA
      </LoadingButton>
    </Container>
  );
}

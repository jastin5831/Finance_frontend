// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
import { GetCOA, GetRevenueByMonth } from 'src/api/transaction';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import AnalyticsCurrentVisits from './analytics-current-visits';
import AnalyticsCard from './analytics-card';
import {handleValue} from './func';

export default function IncomeStatement() {
  const settings = useSettingsContext();
  const [result, setResult] = useState({
    Revenue:null, Expense:null, TotalRevenue:[], NetIncome:[], GrossProfit:[]
  });
  const [coa, setCoa] = useState([]);
  const [selectedDate, setSelectedDate] = useState({from:null, to:null});
  const [error, setError] = useState(null);
  const {user} = useAuthContext()

  const handleDateChange = (date, type) => {
    let dateResult;
    if(type) {
      dateResult = {...selectedDate, from: date}
    } else {
      dateResult = {...selectedDate, to: date}
    }
    setSelectedDate(dateResult)
  };
  
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        if (selectedDate.from !== null && selectedDate.to !== null) {
          const startDate = dayjs(selectedDate.from).year()*100 + dayjs(selectedDate.from).month();
          const endDate = dayjs(selectedDate.to).year()*100 + dayjs(selectedDate.to).month();
          const dateRange = {from:startDate, to:endDate}
          const data = {
            userId: user._id,
            date: dateRange
          }
          const response = await GetRevenueByMonth(data);
          if(response.type === "success") {
            toast.success("Revenue Successfully Upload!",{theme: "colored"});
            const dataResult = response.data;
            dataResult.data.sort((a, b) => a.data.dateFlag - b.data.dateFlag);
            const summarize = handleValue(dataResult.data, coa);
            setResult(summarize)
            setError(null);  
          }else {
            toast.error('Revenue Upload Error', {theme: "colored"})
          }
        }
      } catch (err) {
        setError(err);
      }
    };
    fetchRevenue();
  }, [selectedDate, user._id, coa]);

  useEffect(() => {
    const fetchCOA = async () => {
      const data = { userId: user._id };
      const response = await GetCOA(data);
      if(response.type === "success") {
        toast.success("COA Successfully Upload!",{theme: "colored"});
        setCoa(response.data);
      }else {
        toast.error('COA Upload Error', {theme: "colored"})
      }
    };
    fetchCOA();
  }, [user._id]);
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Typography variant="h4">👋 Welcome to IncomeStatement</Typography>
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
      <Box
        sx={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, 
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box sx={{width: {xl:"35%", lg: "42%", xs:'95%'}, p:1}}>
          <AnalyticsCard title='NetIncome' data={result?.NetIncome ?? []}/>
        </Box>
        <Box sx={{width: {xl:"35%", lg: "42%", xs:'95%'}, p:1}}>
          <AnalyticsCard title='Total Revenue' data={result?.TotalRevenue ?? []}/>
        </Box>
        <Box sx={{width: {xl:"35%", lg: "42%", xs:'95%'}, p:1}}>
          <AnalyticsCard title='Gross Profit' data={result?.GrossProfit ?? []}/>
        </Box>
      </Box>
      <Box 
        sx={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, 
          flexDirection: { xs: 'column', sm: 'row' }
        }} >
        <Box sx={{width: {xl:"45%", xs:'95%'}, p:1}}>
          <AnalyticsCurrentVisits
            title="Revenue Distribtion"
            chart={{
              series: result?.Revenue ?? [
                { name: 'a', value: 1 },
                { name: 'b', value: 1 },
                { name: 'c', value: 1 },
                { name: 'd', value: 1 },
                { name: 'e', value: 1 },
              ],
            }}
          />
        </Box>
        <Box sx={{width: {xl:"45%", xs:'95%'}, p:1}}>
          <AnalyticsCurrentVisits
            title="Expense Distribtion"
            chart={{
              series: result?.Expense ?? [
                { name: 'a', value: 1 },
                { name: 'b', value: 2 },
                { name: 'c', value: 3 },
                { name: 'd', value: 2 },
              ],
            }}
          />
        </Box>
      </Box>
      {error && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh', // Ensure full viewport height
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ pt: 5 }}>
            {error?.message}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

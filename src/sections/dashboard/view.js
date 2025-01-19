// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {toast } from 'react-toastify';
import { GetCOA, GetRevenueByMonth } from 'src/api/revenue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import AnalyticsCurrentVisits from './analytics-current-visits';
import AnalyticsCard from './analytics-card';

// ----------------------------------------------------------------------

const checkData = (totalResult, temp, item, coaData) => {
  const tempResult = totalResult
  const setTotalResult = (type) => {
    let flag = false;
    if (type) {
      if(tempResult.revenue.length > 0) {
        tempResult.revenue.forEach((revenue) => {
          if (revenue.name === item[3]) {
            revenue.value += item[2];
            flag = true;
          }
        });
      } 
      if (flag === false) tempResult.revenue.push({ name: item[3], value: item[2] });
    } else {
      if(tempResult.expense.length > 0) {
        tempResult.expense.forEach((expense) => {
          if (expense.name === item[3]) {
            expense.value += item[2];
            flag = true;
          }
        });
      }
      if (flag === false) tempResult.expense.push({ name: item[3], value: item[2] });
    }
  };

  if (coaData[0].toString() === item[0]) {
    switch (coaData[2]) {
      case 'Revenues':
        temp.revenue += item[2];
        totalResult = setTotalResult(true);
        break;
      case 'COGS':
        temp.cogs += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'S&O':
        temp.so += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'SGA':
        temp.sga += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'Salaries & Benefits':
        temp.salaries += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'Tax':
        temp.taxes += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'Amortization & Depr':
        temp.amorization += item[2];
        totalResult = setTotalResult(false);
        break;
      case 'Projects':
        temp.project += item[2];
        totalResult = setTotalResult(false);
        break;
      default:
        break;
    }
  }
};

// monthly data
const divideData = (mData, coa) => {
  const totalResult = { revenue: [], expense: []};
  const temp = { revenue: 0, cogs: 0, so: 0, sga: 0, salaries: 0, taxes: 0, amorization: 0, project: 0 };
  mData.forEach((item) => {
    coa.map( (coaData) => {
      if(coaData[0].toString()===item[0]) {
        checkData(totalResult, temp, item, coaData)
      } 
      return true 
    });
  });
  const resultData = {
    monthly: totalResult, eachItem: temp
  }
  return resultData;
};

// total result
const handleValue = (data,coa) => {
  const totalResult = {Revenue:[], Expense:[], TotalRevenue:[],NetIncome:[],GrossProfit:[]}

  const checkResult = (tempData, flag) =>{
    tempData.forEach(item => {
      let exist = true;
      if(flag === true) {
        totalResult.Revenue.map((revenue => {
          if(item.name === revenue.name){
            revenue.value += item.value;
            exist = false;
          }
          return true;
        }))
        if(exist === true) totalResult.Revenue.push(item)
      } else {
        totalResult.Expense.map(expense => {
          if(item.name === expense.name){
            expense.value += item.value;
            exist = false;
          }
          return true;
        })  
        if(exist === true) totalResult.Revenue.push(item)
      }
    })
  }

  const addMonthlyResult = (monthlyResult, date) => {
    const {revenue, amorization, cogs, project, salaries, sga, so, taxes} = monthlyResult.eachItem
    
    const totalRevenue = revenue; 
    const netIncome= revenue - (so + sga+ salaries + taxes + amorization + project);
    const grossProfit= revenue - (cogs + so);
    totalResult.TotalRevenue.push({year:date, value:totalRevenue})
    totalResult.NetIncome.push({year:date, value:netIncome})
    totalResult.GrossProfit.push({year:date, value:grossProfit})
    
    if(totalResult.Revenue.length === 0) {
      totalResult.Revenue.push(...monthlyResult.monthly.revenue)
    } else {
      checkResult(monthlyResult.monthly.revenue, true) 
    }

    if(totalResult.Expense.length === 0) {
      totalResult.Expense.push(...monthlyResult.monthly.expense)
    } else {
      checkResult(monthlyResult.monthly.expense, false)
    }
  }

  data.forEach((item) => {
    if (item.data.length > 0 && Array.isArray(item.data)) {
      const date = item.dateFlag;
      const temp = [...item.data];
      // item.data => one month's result => It's array.
      const monthlyResult = divideData(temp, coa);
      addMonthlyResult(monthlyResult, date);
    } else {
      console.log('empty')
    }
  });
  return totalResult
};

export default function Dashboard() {
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
        <Typography variant="h4"> Welcome to Dashboard</Typography>
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

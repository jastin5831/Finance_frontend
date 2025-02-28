
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify'; 
import {CreateRevenue, CreateBalanceSheet } from 'src/api/transaction';
import { CreateForecast } from 'src/api/forecast';

export const devide = (value) => {
    const ISData = []; 
    const BSData = [];
    value.map(item => {
      if(item[1] !== ''){
        ISData.push(item)
      } else {BSData.push(item)}
      return true
    })
    return {IS:ISData, BS:BSData}
}

export const aggregate = (data,type) => {
  const result = Object.values(
    data.reduce((acc, item) => {
      let key = ''
      if(type === 'IS') { 
        key = item[3]
      } else {
        key = item[0]
      }
      if (!acc[key]) {
        acc[key] = [...item]; 
      } else {
        acc[key][2] += item[2];
      }
      return acc;
    }, {})
  );
  return result;
}

export const createRevenue = async (ISData,setResult,setUploadState, COAResult) => {
  if(!ISData.data || ISData.data.length === 0) {
      console.log("Monthly Result data required!")
      setUploadState(false)
  } else {
    const resRev = await CreateRevenue(ISData)
    if(resRev.type === "success") {
        toast.success('Revenue Successfully Created',{theme: "colored"})
        setResult(resRev.data);
    }else {
        toast.error('Revenue Create Error',{theme: "colored"})
    }
    const resFore = await CreateForecast(ISData, COAResult);
    if(resFore === "success") {
        toast.success('Forecast Successfully Created',{theme: "colored"})
    }else {
        toast.error('Forecast Create Error',{theme: "colored"})
    }
    setUploadState(false)
  }
}

export const createBS = async (BSData,setUploadState,setResult) => {
  if(!BSData.data || BSData.data.length === 0) {
      console.log("BS data required!")
      setUploadState(false)
  } else {
    const resRev = await CreateBalanceSheet(BSData)
    if(resRev.type === "success") {
        toast.success('BS Successfully created',{theme: "colored"})
    setResult(resRev.data);
    }else {
        toast.error('BS Create Error',{theme: "colored"})
    }
    setUploadState(false)
  }
}
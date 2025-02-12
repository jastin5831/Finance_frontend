import axios, { endpoints } from 'src/utils/axios';

export const GetRevenueByMonth = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.revenue.getRevenueByMonth, data)
            .then(res => {result = {type: 'success', data: res.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};

export const GetRevenue = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.revenue.getRevenue, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const GetBalanceSheet = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.balanceSheet.getBalanceSheet, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const GetBalanceSheetByMonth = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.balanceSheet.getBalanceSheetByMonth, data)
            .then(res => {result = {type: 'success', data: res.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.error(
      'Error fetching Balance Sheet By Month:', error
    );
    throw error;
  }
};

export const GetCOA = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.coa.getCOA, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const CreateRevenue = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.revenue.create, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.log("Error Create Revenue", error);
    throw error;
  }
}

export const CreateBalanceSheet = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.balanceSheet.create, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.log("Error Create Revenue", error);
    throw error;
  }
}

export const CreateCOA = async (data) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.coa.create, data)
            .then(res => {result = {type: 'success', data: res.data.data.data}})
            .catch(err => {result = {type: 'error', data: err}})
    return result;
  } catch (error) {
    console.log("Error Create COA", error);
    return [];
  }
}
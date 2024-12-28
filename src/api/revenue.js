import axios, { endpoints } from 'src/utils/axios';

export const GetRevenueByMonth = async (data) => {
  try {
    const response = await axios.post(endpoints.revenue.getRevenueByMonth, data)
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Revenue By Month:', error
    );
    throw error;
  }
};

export const GetRevenue = async (data) => {
  try {
    const response = await axios.post(endpoints.revenue.getRevenue, data)
    return response.data.data.data;
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const GetCOA = async (data) => {
  try {
    const response = await axios.post(endpoints.coa.getCOA, data)
    return response.data.data.data;
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const CreateRevenue = async (data) => {
  try {
    const response = await axios.post(endpoints.revenue.create, data)
    return response.data.data.data;
  } catch (error) {
    console.log("Error Create Revenue", error);
    throw error;
  }
}

export const CreateCOA = async (data) => {
  try {
    const response = await axios.post(endpoints.coa.create, data)
    return response.data.data.data;
  } catch (error) {
    console.log("Error Create COA", error);
    return [];
  }
}
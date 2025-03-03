import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  auth: {
    me: '/api/user/profile',
    login: '/api/auth/sign-in',
    register: '/api/auth/sign-up',
    update: '/api/auth/update',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  revenue: {
    create: '/api/revenue/create',
    getRevenue: '/api/revenue/getRevenue',
    getRevenueByMonth: '/api/revenue/getRevenueByMonth',
  },
  balanceSheet: {
    create: '/api/balanceSheet/create',
    getBalanceSheet: '/api/balanceSheet/getBalanceSheet',
    getBalanceSheetByMonth:'/api/balanceSheet/getBalanceSheetByMonth',
  },
  coa: {
    create: '/api/coa/create',
    getCOA: '/api/coa/getCOA',
  },
  forecast: {
    create: '/api/forecast/create',
    update: '/api/forecast/update',
    get: '/api/forecast/get',
  },
  subscription: {
    create: 'api/subscription/create',
    update: 'api/subscription/update',
    get: 'api/subscription/get',
    cancel: 'api/subscription/cancel'
  }
};

import { useMemo } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import { paths } from 'src/routes/paths';

const ICONS = {
  dashboard: <DashboardIcon fontSize='large'/>,
  forecastRevnue: <StackedBarChartIcon fontSize='large'/>,
  coa: <AssuredWorkloadOutlinedIcon fontSize='large'/>,
  transaction: <RequestQuoteIcon fontSize='large'/>,
  admin: <AdminPanelSettingsIcon fontSize='large'/>,
  checkList: <ChecklistIcon fontSize='medium'/>,
  manageUser: <ManageAccountsIcon fontSize='medium'/>,
  subscription: <SubscriptionsIcon fontSize='medium'/>,
  help: <MarkUnreadChatAltOutlinedIcon fontSize='medium'/>
};

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'Financial Statement',
        items: [
          { title: 'Income Statement', path: paths.dashboard.root, icon: ICONS.dashboard },
        ],
      },
      {
        subheader: 'Budgeting & Forecasting',
        items: [
          {
            title: 'Forecast Revenue',
            path: paths.dashboard.forecastRevnue,
            icon: ICONS.forecastRevnue,
          },
        ],
      },
      {
        subheader: 'Data Upload',
        items: [
          { title: 'COA Upload', path: paths.dashboard.coaUpload, icon: ICONS.coa },
          { title: 'Transaction Upload', path: paths.dashboard.transactionUpload, icon: ICONS.transaction },
        ],
      },
      {
        subheader: 'Security',
        items: [
          {
            title: 'Admin',
            path: paths.dashboard.admin.root,
            icon: ICONS.admin,
            children: [
              { title: 'CheckList', path: paths.dashboard.admin.checkList, icon: ICONS.checkList },
              { title: 'User Management', path: paths.dashboard.admin.userManagement, icon: ICONS.manageUser},
            ],
          },
          { title: 'Subscription', path: paths.dashboard.subscription, icon: ICONS.subscription},
          { title: 'Help', path: paths.dashboard.help, icon: ICONS.help}
        ],
      },
    ],
    []
  );

  return data;
}

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';


const IndexPage = lazy(() => import('src/pages/dashboard/incomeStatement'));
const CoaUpload = lazy(() => import('src/pages/dataUpload/coaUpload'));
const TransactionUpload = lazy(() => import('src/pages/dataUpload/transactionUpload'));
const DataForecast = lazy(() => import('src/pages/budgeting_forecasting/dataForecast'));
const CheckList = lazy(() => import('src/pages/admin/checklist'));
const UserManagement = lazy(() => import('src/pages/admin/userManagement'));
const Subscription = lazy(() => import('src/pages/security/subscription'));
const Help = lazy(() => import('src/pages/security/help'));
 
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'forecastRevenue', element: <DataForecast /> },
      { path: 'coaUpload', element: <CoaUpload /> },
      { path: 'transactionUpload', element: <TransactionUpload /> },
      {
        path: 'admin',
        children : [
          {path: 'checkList', element : <CheckList/>},
          {path: 'userManagement', element : <UserManagement/>},
        ]
      },
      { path: 'subscription', element : <Subscription/>},
      { path: 'help', element: <Help /> },
    ],
  },
];

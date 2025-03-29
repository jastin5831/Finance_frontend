import { Navigate, useRoutes } from 'react-router-dom';
// config
import Landing from 'src/sections/auth/landing';
import { mainRoutes } from './main';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Landing/>,
    },
    ...authRoutes,
    ...dashboardRoutes,
    ...mainRoutes,
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

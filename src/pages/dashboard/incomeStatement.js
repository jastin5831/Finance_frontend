import { Helmet } from 'react-helmet-async';
import Dashboard from 'src/sections/dashboard/view';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> IncomeStatement</title>
      </Helmet>
 
      <Dashboard />
    </>
  );
}

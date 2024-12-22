import { Helmet } from 'react-helmet-async';
import Revenue from 'src/sections/revenue/view';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Revenue</title>
      </Helmet>

      <Revenue />
    </>
  );
}

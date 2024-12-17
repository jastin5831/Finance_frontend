import { Helmet } from 'react-helmet-async';
import Detail from 'src/sections/details/view';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Details</title>
      </Helmet>

      <Detail />
    </>
  );
}

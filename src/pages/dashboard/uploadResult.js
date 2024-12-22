import { Helmet } from 'react-helmet-async';
import UploadResult from 'src/sections/revenue/view';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: UploadResult</title>
      </Helmet>

      <UploadResult />
    </>
  );
}

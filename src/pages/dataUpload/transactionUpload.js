import { Helmet } from 'react-helmet-async';
import TransactionUpload from 'src/sections/DataUpload/transactionUpload/view';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: TransactionUpload</title>
      </Helmet>

      <TransactionUpload />
    </>
  );
}

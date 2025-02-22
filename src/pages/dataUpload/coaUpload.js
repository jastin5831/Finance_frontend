import { Helmet } from 'react-helmet-async';
import CoaUpload from 'src/sections/DataUpload/coaUpload/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: COA Upload</title>
      </Helmet>

      <CoaUpload />
    </>
  );
}

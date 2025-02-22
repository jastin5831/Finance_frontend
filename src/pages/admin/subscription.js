import { Helmet } from 'react-helmet-async';
// sections
import Subscription from 'src/sections/Security/Admin/subscription';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Subscription</title>
      </Helmet>

      <Subscription />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// sections
import Subscription from 'src/sections/Security/subscription/subscription';
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
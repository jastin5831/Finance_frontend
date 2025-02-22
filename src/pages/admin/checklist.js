import { Helmet } from 'react-helmet-async';
// sections
import CheckList from 'src/sections/Security/Admin/checkList';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> CheckList</title>
      </Helmet>

      <CheckList />
    </>
  );
}

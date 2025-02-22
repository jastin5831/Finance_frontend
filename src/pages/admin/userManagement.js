import { Helmet } from 'react-helmet-async';
// sections
import UserManagement from 'src/sections/Security/Admin/userManagement';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> UserManagement</title>
      </Helmet>

      <UserManagement />
    </>
  );
}

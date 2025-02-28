import { Helmet } from 'react-helmet-async';
// sections
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { bgGradient } from 'src/theme/css';
import JwtLandingPage from 'src/sections/auth/landing';

export default function LoginPage() {
  const theme = useTheme();
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
        }),
      }}
    >
      <Helmet>
        <title>financial project for small/medium sized company business</title>
      </Helmet>
      <JwtLandingPage />
    </Stack>
  );
}

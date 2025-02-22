import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';

export default function AuthClassicLayout({ children, image, title }) {

  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        borderRadius: "0.5rem", 
        position: "relative", zIndex: 1,
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
        }),
        backgroundImage: `url(${title ? '/assets/background/login.jpg' : '/assets/background/register.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
    />
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box sx={{width:"60%",position: "relative"}}>
        <Box 
          sx={{
            position: "absolute", top: "6%", left: "1%", 
            transform: "translate(0%, -50%)", zIndex: 2 
          }}
        >
          <Logo />
        </Box>
        {upMd && renderSection}
      </Box>
      <Box sx={{width:"40%"}}>
        {renderContent}
      </Box>
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};

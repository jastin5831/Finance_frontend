import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import { Typography, Box } from '@mui/material';

// routes
import { RouterLink } from 'src/routes/components';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box sx={{display:"flex", alignItems:"center"}}>
      <Box
        ref={ref}
        component="img"
        src="/logo/logo.png"
        alt="Logo"
        sx={{
          width: {xl:100, lg: 100, xs:50},
          height: {xl:100, lg: 100, xs:50},
          display: 'inline-flex',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, color 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            color: 'secondary.main',
          },
        }}
      />
      <Typography variant="h4" color='#41c1af'>Totadvi</Typography> 
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;

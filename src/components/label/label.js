import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import { StyledLabel } from './styles';

// ----------------------------------------------------------------------

const Label = forwardRef(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyle = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyle }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyle }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

Label.propTypes = {
  children: PropTypes.node,
  endIcon: PropTypes.object,
  startIcon: PropTypes.object,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost', 'soft']),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default Label;

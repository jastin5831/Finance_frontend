import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

const Scrollbar = forwardRef(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default memo(Scrollbar);

import PropTypes from 'prop-types'; // @mui
import { menuItemClasses } from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
//
import { getPosition } from './utils';
import { StyledArrow } from './styles';

// ----------------------------------------------------------------------

export default function CustomPopover({
  open,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            overflow: 'inherit',
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}

CustomPopover.propTypes = {
  sx: PropTypes.object,
  open: PropTypes.object,
  children: PropTypes.node,
  hiddenArrow: PropTypes.bool,
  disabledArrow: PropTypes.bool,
  arrow: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ]),
};

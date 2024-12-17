import { alpha } from '@mui/material/styles';
import { toggleButtonClasses } from '@mui/material/ToggleButton';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

export function toggleButton(theme) {
  const rootStyles = (ownerState) => {
    const defaultStyle = {
      [`&.${toggleButtonClasses.selected}`]: {
        borderColor: 'currentColor',
        boxShadow: '0 0 0 0.5px currentColor',
      },
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        '&:hover': {
          borderColor: alpha(theme.palette[color].main, 0.48),
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
        },
      }),
    }));

    const disabledState = {
      [`&.${toggleButtonClasses.disabled}`]: {
        [`&.${toggleButtonClasses.selected}`]: {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected,
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    };

    return [defaultStyle, ...colorStyle, disabledState];
  };

  return {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState),
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
        },
        grouped: {
          margin: 4,
          [`&.${toggleButtonClasses.selected}`]: {
            boxShadow: 'none',
          },
          '&:not(:first-of-type), &:not(:last-of-type)': {
            borderRadius: theme.shape.borderRadius,
            borderColor: 'transparent',
          },
        },
      },
    },
  };
}

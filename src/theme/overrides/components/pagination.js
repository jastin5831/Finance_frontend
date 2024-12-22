import { alpha } from '@mui/material/styles';
import { paginationItemClasses } from '@mui/material/PaginationItem';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// ----------------------------------------------------------------------

export function pagination(theme) {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState) => {
    const defaultColor = ownerState.color === 'standard';

    const filledVariant = ownerState.variant === 'text';

    const outlinedVariant = ownerState.variant === 'outlined';

    const softVariant = ownerState.variant === 'soft';

    const defaultStyle = {
      [`& .${paginationItemClasses.root}`]: {
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.24),
        }),

        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          ...(outlinedVariant && {
            borderColor: 'currentColor',
          }),

          ...(defaultColor && {
            backgroundColor: alpha(theme.palette.grey[500], 0.08),
            ...(filledVariant && {
              color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
              backgroundColor: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[100],
              },
            }),
          }),
        },
      },
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        [`& .${paginationItemClasses.root}`]: {
          [`&.${paginationItemClasses.selected}`]: {
            ...(ownerState.color === color && {
              // SOFT
              ...(softVariant && {
                color: theme.palette[color][lightMode ? 'dark' : 'light'],
                backgroundColor: alpha(theme.palette[color].main, 0.08),
                '&:hover': {
                  backgroundColor: alpha(theme.palette[color].main, 0.16),
                },
              }),
            }),
          },
        },
      }),
    }));

    return [defaultStyle, ...colorStyle];
  };

  return {
    MuiPagination: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyles(ownerState),
      },
    },
  };
}

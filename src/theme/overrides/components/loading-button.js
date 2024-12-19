import { loadingButtonClasses } from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export function loadingButton(theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...( {
            [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
              left: 10,
            },
            [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
              right: 14,
            },
            ...({
              [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
                left: 10,
              },
              [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}

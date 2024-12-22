//
import { menuItem } from '../../css';

// ----------------------------------------------------------------------

export function menu(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}

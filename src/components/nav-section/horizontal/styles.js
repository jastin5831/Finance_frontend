// @mui
import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, open, depth, config, theme }) => {
  const subItem = depth !== 1;

  const activeStyles = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
  };

  return {
    // Root item
    flexShrink: 0,
    padding: config.itemPadding,
    marginRight: config.itemGap,
    borderRadius: config.itemRadius,
    minHeight: config.itemRootHeight,
    color: theme.palette.text.secondary,

    // Active item
    ...(active && {
      ...activeStyles,
    }),

    // Sub item
    ...(subItem && {
      margin: 0,
      padding: theme.spacing(0, 1),
      minHeight: config.itemSubHeight,
    }),

    // Open
    ...(open &&
      !active && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)(({ size }) => ({
  width: size,
  height: size,
  flexShrink: 0,
  marginRight: 0,
}));

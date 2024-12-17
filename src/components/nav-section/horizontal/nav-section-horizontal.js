import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import Stack from '@mui/material/Stack';
// theme
import { hideScroll } from 'src/theme/css';
//
import { navHorizontalConfig } from '../config';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, config, sx, ...other }) {
  return (
    <Stack
      direction="row"
      sx={{
        mx: 'auto',
        ...hideScroll.y,
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          items={group.items}
          config={navHorizontalConfig(config)}
        />
      ))}
    </Stack>
  );
}

NavSectionHorizontal.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  sx: PropTypes.object,
};

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

function Group({ items, config }) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}

Group.propTypes = {
  config: PropTypes.object,
  items: PropTypes.array,
};

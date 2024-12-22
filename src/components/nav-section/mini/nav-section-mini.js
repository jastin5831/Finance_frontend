import PropTypes from 'prop-types';
import { memo } from 'react';
import Stack from '@mui/material/Stack';
//
import { navMiniConfig } from '../config';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionMini({ data, config, sx, ...other }) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} config={navMiniConfig(config)} />
      ))}
    </Stack>
  );
}

NavSectionMini.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  sx: PropTypes.object,
};

export default memo(NavSectionMini);

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

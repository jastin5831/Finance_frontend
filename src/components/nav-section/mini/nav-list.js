import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import { appBarClasses } from '@mui/material/AppBar';
// routes
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
//
import NavItem from './nav-item';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
  const navRef = useRef(null);

  const pathname = usePathname();

  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path.includes('http');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll(`.${appBarClasses.root}`));

    // Reset styles when hover
    const styles = () => {
      document.body.style.overflow = '';
      document.body.style.padding = '';
      // Apply for Window
      appBarEl.forEach((elem) => {
        elem.style.padding = '';
      });
    };

    if (open) {
      styles();
    } else {
      styles();
    }
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={open}
        active={active}
        externalLink={externalLink}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        config={config}
      />

      {hasChild && (
        <Popover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose,
              sx: {
                mt: 0.5,
                width: 160,
                ...(open && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <NavSubList data={data.children} depth={depth} config={config} />
        </Popover>
      )}
    </>
  );
}

NavList.propTypes = {
  config: PropTypes.object,
  data: PropTypes.object,
  depth: PropTypes.number,
  hasChild: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, config }) {
  return (
    <Stack spacing={0.5}>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </Stack>
  );
}

NavSubList.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  depth: PropTypes.number,
};

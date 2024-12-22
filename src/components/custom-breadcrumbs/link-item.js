import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function BreadcrumbsLink({ link, activeLast, disabled }) {
  const { name, href, icon } = link;

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (href) {
    return (
      <Link component={RouterLink} href={href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}

BreadcrumbsLink.propTypes = {
  activeLast: PropTypes.bool,
  disabled: PropTypes.bool,
  link: PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.node,
    name: PropTypes.string,
  }),
};

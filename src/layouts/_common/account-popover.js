import { m } from 'framer-motion';
import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// routes
import { useRouter } from 'src/routes/hooks';
// hooks
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import BaseOptions from 'src/components/settings/drawer/base-option';
import { useSettingsContext } from 'src/components/settings';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({onOpenModal}) {
  const router = useRouter();
  const settings = useSettingsContext();

  // const { user } = useMockedUser();

  const { logout, user } = useAuthContext();

  const popover = usePopover();
  const updateProfile = () => {
    onOpenModal(true)
  }
  const handleLogout = async () => {
    try {
      router.replace('/auth/jwt/login');
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 300, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            Email:
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Light & Dark Mode
          </Typography>
          <BaseOptions
            value={settings.themeMode}
            onChange={(newValue) => settings.onUpdate('themeMode', newValue)}
            options={['light', 'dark']}
            icons={['sun', 'moon']}
          />
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box>
          <Grid container justifyContent='space-evenly'>
            <Grid item lg={4} >
              <MenuItem
                onClick={updateProfile}
                sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main', textAlign:'center' }}
              >
                Update
              </MenuItem>
            </Grid>
            <Grid item lg={4} >
              <MenuItem
                onClick={handleLogout}
                sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main', textAlign: 'center'}}
              >
                Logout
              </MenuItem>
            </Grid>
          </Grid>
        </Box>
      </CustomPopover>
    </>
  );
}

AccountPopover.propTypes = {
  onOpenModal: PropTypes.func,
};
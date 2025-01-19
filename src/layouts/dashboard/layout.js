import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSettingsContext } from 'src/components/settings';
//
import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';
import UpdateProfile from './update';
// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  const [openModal, setOpenModal] = useState(false)

  const handleModal = (value) => setOpenModal(value);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const renderModal = (
    <Modal open={openModal} onClose={() => handleModal(false)}>
      <Box sx={{ ...modalStyle, position: 'relative' }}>
      <IconButton 
        onClick={() => handleModal(false)} 
        sx={{ position: 'absolute', top: 8, right: 8, color: 'gray' }}
      >
        <CloseIcon />
      </IconButton>

      <h2 style={{ textAlign: 'center' }}>Update Profile</h2>
      
      <UpdateProfile />
    </Box>
    </Modal>
  );

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}
        
        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} onOpenModal={handleModal}/>
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}
          <Main>{children}</Main>
          {renderModal}
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} onOpenModal={handleModal}/>
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {renderNavVertical}
        <Main>{children}</Main>
        {renderModal}
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

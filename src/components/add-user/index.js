import React from 'react'
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddUserInput from './input';

const AddUser = ({handleModal, addUsers}) => (
  <Box>
    <IconButton 
      onClick={() => handleModal(false)} 
      sx={{ position: 'absolute', top: 8, right: 8, color: 'gray' }}
    >
      <CloseIcon />
    </IconButton>

    <h2 style={{ textAlign: 'center' }}>Add User</h2>
    <AddUserInput handleModal={handleModal} addUsers={addUsers}/>    
  </Box>
)

AddUser.propTypes = {
  handleModal: PropTypes.func,
  addUsers: PropTypes.func
}

export default AddUser
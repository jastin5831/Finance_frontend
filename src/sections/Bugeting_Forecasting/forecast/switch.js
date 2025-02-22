import PropTypes from 'prop-types';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 70,
    height: 30,
    borderRadius: 15,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 20,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(40px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(35px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          ...theme.applyStyles('dark'),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 24,
      height: 24,
      borderRadius: 20,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
}));

const SwitchButton = ({setState, statement}) => {
  const handlechange = () => {
      setState(!statement);
  }
  return (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography>BS</Typography>
        <AntSwitch defaultChecked value={statement} onClick={handlechange}/>
        <Typography>IS</Typography>
      </Stack>
  )
}

SwitchButton.propTypes = {
  statement: PropTypes.bool,
  setState: PropTypes.func
};
export default SwitchButton;
import React from 'react'

import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const BalanceSheetHeader = ({
  inputRef, selectedDate, handleDateChange,handleSearch,
}) => (
  <Box
    sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 2,
    mb: 2
    }}
  >
    <TextField
      variant="outlined"
      size="small"
      inputRef={inputRef}
      placeholder="Search by AccountID"
      InputProps={{
        endAdornment: (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            color="primary"
            onClick={handleSearch} 
          >
          <SearchIcon />
          </IconButton>
        </InputAdornment>
        ),
      }}
      sx={{ width: '20%' }}
    />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        mr: 4,
        border: '2px solid',
        borderColor: '#007867',
        borderRadius: 1,
        p: 0.2,
      }}
    >
      <DatePicker 
        label={selectedDate.from === null ? 'From' : ''} 
        views={['month', 'year']} 
        value={selectedDate.from}
        onChange={(e) => handleDateChange(e, true)}
      />
      <Box sx={{ mx: 1 }}>-</Box>
      <DatePicker 
        label={selectedDate.to === null ? 'To' : ''}  
        views={['month', 'year']} 
        value={selectedDate.to}
        onChange={(e) => handleDateChange(e, false)}
      />
    </Box>
  </Box>
)

BalanceSheetHeader.propTypes = {
  inputRef:PropTypes.object,
  selectedDate: PropTypes.object,
  handleDateChange: PropTypes.func,
  handleSearch: PropTypes.func
};

export default BalanceSheetHeader
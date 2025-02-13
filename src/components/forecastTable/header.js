import React from 'react'

import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const ForecastHeader = 
    ({
      inputRef, date,setDate, selectedDate, setExportData,
      handleDateChange, addEditableRow,handleSearch,
    }) => 
    (
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
                    mr: 4,
                    ml: 4,
                    border: '2px solid',
                    borderColor: '#007867',
                    borderRadius: 1,
                    p: 0.2,
                }}
            >
                <DatePicker 
                    label={date === null ? 'Forecast' : ''}
                    views={['month', 'year']}  
                    value={date} 
                    onChange={(e) => setDate(e)}
                />
            </Box>
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
            <Button
                variant='contained' color='primary' sx={{mr: 3}}
                onClick={() => setExportData(true)}
            >
                Export
            </Button>
            <Button
                variant='contained' color='primary' sx={{mr: 3}}
                onClick={addEditableRow}
            >
                Add
            </Button>
        </Box>
    )

ForecastHeader.propTypes = {
  setExportData: PropTypes.func,
  inputRef: PropTypes.object,
  date: PropTypes.object,
  selectedDate: PropTypes.object,
  setDate: PropTypes.func,
  addEditableRow: PropTypes.func,
  handleDateChange: PropTypes.func,
  handleSearch: PropTypes.func
};

export default ForecastHeader
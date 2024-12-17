import { Box } from '@mui/material';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-datepicker/dist/react-datepicker.css';

const MonthYearPicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date change
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        isClearable
        placeholderText="Select a month/year"
      />
    </Box>
  );
};

export default MonthYearPicker;

import React from 'react'
import PropTypes from 'prop-types';

import {
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';


const TransactionRow = ({ name, amount, date, status }) =>  (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>${amount}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Typography
          component="span"
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 8,
            fontSize: '0.875rem',
            bgcolor: status === 'Completed' ? 'success.50' : 'warning.50',
            color: status === 'Completed' ? 'success.900' : 'warning.900'
          }}
        >
          {status}
        </Typography>
      </TableCell>
    </TableRow>
)

TransactionRow.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string
}

export default TransactionRow
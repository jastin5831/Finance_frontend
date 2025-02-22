import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import PropTypes from 'prop-types';

const BalanceSheetContainer = ({ 
  month=[], paginatedData=[], orderBy, 
  handleRequestSort, orderDirection
}) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ textAlign: 'center'}}>
            <TableSortLabel
              active={orderBy === 'AccountID'}
              direction={orderBy === 'AccountID' ? orderDirection : 'asc'}
              onClick={() => handleRequestSort('AccountID')}
            >
              AccountID
            </TableSortLabel>
          </TableCell>
          {month.length > 0 && month.map((item, key) => (
            <TableCell key={key}  sx={{textAlign: 'center'}}>
              {item}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedData.length > 0 && paginatedData.map((item, index) => (
          <TableRow key={index} sx={{textAlign: 'center'}}>
            <TableCell sx={{textAlign: 'center'}}>{item.AccountId}</TableCell>
            {item.data.length > 0 && item.data.map( (data, key) => (
              <TableCell key={key} sx={{textAlign: 'center'}}>{data.amount}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

BalanceSheetContainer.propTypes = {
    month: PropTypes.array,
    orderBy: PropTypes.string,
    orderDirection: PropTypes.string,
    handleRequestSort: PropTypes.func,
    paginatedData: PropTypes.array,
};

export default BalanceSheetContainer
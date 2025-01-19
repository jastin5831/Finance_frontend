import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  TableSortLabel,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { parseInt } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

const ForecastTable = ({ currentResult, month, date, setDate, changeResult}) => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempQuery, setTempQuery] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const header = ['AccountID', 'RevenueExpenseID', 'Description'];
  const [newRow, setNewRow] = useState(null);

  const handleSearchChange = (event) => {
    setTempQuery(event.target.value);
  };

  const handleRequestSort = (column) => {
    const isAsc = orderBy === column && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setSearchQuery(tempQuery);
  }

  const addEditableRow = () => {
    setNewRow({
      AccountId: '',
      RevenueExpenseId: '',
      Description: '',
      data: month.map(() => ({ actual: 0, forecast: 0 })),
      average:0,
      userInfo: 0,
      result: 0,
    });
  };
  
  const saveNewRow = () => {
    let flag = true;
    if(newRow.AccountID === '' && newRow.RevenueExpenseId === '' && newRow.Description === '' && newRow.userInfo === 0) {
      flag = false;
      toast.warn('Missing Value',{theme:'colored'})
    }
    if (newRow && flag) {
      const tempData = [...tableData, newRow];
      changeResult(tempData)
      setNewRow(null); 
    }
  };

  const cancelNewRow = () => {
    setNewRow(null);
  };

  const handleInputChange = (field, value) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (!orderBy) return 0;

    const keyMap = {
      AccountID: 'AccountId',
      RevenueExpenseID: 'RevenueExpenseId',
      Description: 'Description',
    };
    const key = keyMap[orderBy];

    if (!key) return 0; 
    const valueA = a[key] ?? ''; 
    const valueB = b[key] ?? '';

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return orderDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);
    if (Number.isNaN(numA) || Number.isNaN(numB)) return 0; 
    return orderDirection === 'asc' ? numA - numB : numB - numA;
  });
  const filteredData = sortedData.filter((row) => row.AccountId ?.includes(searchQuery));
  
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    setTableData(currentResult)
  },[currentResult])

  const changeUserInfo = (value, id) => {
    const tempData = tableData.map(item => {
      let realValue = 0
      realValue = parseInt(value);
      if(value === '' || value === undefined ) {
        realValue = 0;
      }
      if(item.average === '' || item.average === undefined) {item.average = 0;}
      const tempResult = parseInt(item.average + realValue);
      if(item.RevenueExpenseId === id) {
        return { ...item, userInfo: value , result: tempResult}
      };
      return item;
    })
    changeResult(tempData)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        justifyContent: 'top',
        alignItems: 'center',
      }}
    >
      <Card sx={{ 
        width: '100%', 
        p: 2,
      }}>
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
            value={tempQuery}
            onChange={handleSearchChange}
            placeholder="Search by AccountID"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={handleSearch} // Replace with your search logic
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: '40%' }}
          />
          <Box
            sx={{display:'flex', alignItems:'center'}}
          >
            <Typography mr={2}>Forecast: </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mr: 4,
                border: '2px solid',
                borderColor: '#007867',
                borderRadius: 1,
                p: 0.2,
              }}
            >
              <DatePicker views={['month', 'year']}  value={date} onChange={(e) => setDate(e)}/>
            </Box>
          </Box>
          <Button
            variant='contained' color='primary' sx={{mr: 3}}
            onClick={addEditableRow}
          >
            Add
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {header.map((title, index) => (
                  <TableCell rowSpan={2} key={index} style={{ textAlign: 'center'}}>
                    <TableSortLabel
                      active={orderBy === title}
                      direction={orderBy === title ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(title)}
                    >
                      {title}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {month.map((item, key) => (
                  <TableCell colSpan={2} key={key}  sx={{textAlign: 'center'}}>
                    {item}
                  </TableCell>
                ))}
                <TableCell rowSpan={2}>Adjustment</TableCell>
                <TableCell rowSpan={2}>Forecast</TableCell>
              </TableRow>
              <TableRow>
                {month.map((_, index) => (
                  <React.Fragment key={index}>
                    <TableCell sx={{textAlign: 'center'}}>Actual</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>Forecast</TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index} sx={{textAlign: 'center'}}>
                  <TableCell sx={{textAlign: 'center'}}>{item.AccountId}</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>{item.RevenueExpenseId}</TableCell>
                  <TableCell sx={{textAlign: 'center'}}>{item.Description}</TableCell>
                  {item.data.map( (data, key) => (
                    <React.Fragment key={key}>
                      <TableCell sx={{textAlign: 'center'}}>{data.actual}</TableCell>
                      <TableCell sx={{textAlign: 'center'}}>{data.forecast}</TableCell>
                    </React.Fragment>
                  ))}
                  <TableCell>
                    <TextField 
                      type='number'
                      value= {item.userInfo} 
                      size='small' sx={{maxWidth:65}}  
                      onChange={(e) => changeUserInfo(e.target.value, item.RevenueExpenseId)}
                    />
                  </TableCell>
                  <TableCell>{item.result}</TableCell>
                </TableRow>
              ))}
              {newRow && (
                <TableRow sx={{textAlign: 'center'}}>
                  <TableCell sx={{textAlign: 'center'}}>
                    <TextField
                      value={newRow.AccountId}
                      onChange={(e) => handleInputChange('AccountId', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{textAlign: 'center'}}>
                    <TextField
                      value={newRow.RevenueExpenseId}
                      onChange={(e) => handleInputChange('RevenueExpenseId', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{textAlign: 'center'}}>
                    <TextField
                      value={newRow.Description}
                      onChange={(e) => handleInputChange('Description', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  {newRow.data.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableCell sx={{textAlign: 'center'}}>
                        0
                      </TableCell>
                      <TableCell sx={{textAlign: 'center'}}>
                        0
                      </TableCell>
                    </React.Fragment>
                  ))}
                  <TableCell sx={{textAlign: 'center'}}>
                    <TextField
                      type='number'
                      value={newRow.userInfo}
                      sx={{maxWidth:65}}
                      onChange={(e) => handleInputChange('userInfo', e.target.value)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{textAlign: 'center'}}>
                    <Button onClick={saveNewRow}>Save</Button>
                    <Button onClick={cancelNewRow}>Cancel</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};
ForecastTable.propTypes = {
  currentResult: PropTypes.array,
  month: PropTypes.array,
  date: PropTypes.object,
  setDate: PropTypes.func,
  changeResult: PropTypes.func
};
export default ForecastTable;

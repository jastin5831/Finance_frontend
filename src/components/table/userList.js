import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
} from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';

const UserList = ({ currentUsers, titleArray, handleModal, deleteUsers}) => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempQuery, setTempQuery] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
    
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

  const sortedData = [...tableData].sort((a, b) => {
    if (!orderBy) return 0;
    const columnIndex = titleArray.indexOf(orderBy);
    if (a[columnIndex] < b[columnIndex]) {
      return orderDirection === 'asc' ? -1 : 1;
    }
    if (a[columnIndex] > b[columnIndex]) {
      return orderDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  const filteredData = sortedData.filter((row) => row.email?.toString().includes(searchQuery));
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    setTableData(currentUsers)
  },[currentUsers])
    

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
            placeholder="Search by Email"
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
          <Button
            component="label"
            color="primary"
            variant="contained"
            onClick={() => handleModal(true)}
            startIcon={<FileUploadIcon/>}
          >
            Add User
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {titleArray.map((title, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    {title}
                    <TableSortLabel
                      active={orderBy === title}
                      direction={orderBy === title ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(title)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell style={{ textAlign: 'center' }}>{rowIndex}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{row.email}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{row.role}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>asd</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button 
                      variant='contained' color='error'
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
                          <path fill="currentColor" d="M5 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0m4-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6M2 13c0-1.113.903-2 2.009-2h6.248a5.5 5.5 0 0 0-.657 1H4.009C3.448 12 3 12.447 3 13c0 1.309.622 2.284 1.673 2.953C5.743 16.636 7.265 17 9 17q.3 0 .592-.015q.261.513.618.958Q9.617 18 9 18c-1.855 0-3.583-.386-4.865-1.203C2.833 15.967 2 14.69 2 13m17 1.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-2.646-1.146a.5.5 0 0 0-.708-.708L14.5 13.793l-1.146-1.147a.5.5 0 0 0-.708.708l1.147 1.146l-1.147 1.146a.5.5 0 0 0 .708.708l1.146-1.147l1.146 1.147a.5.5 0 0 0 .708-.708L15.207 14.5z"/>
                        </svg>
                      }
                      onClick={() => deleteUsers(row.email)}
                    >
                      Delete User
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[7, 15, 20]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  )
}

UserList.propTypes = {
  handleModal: PropTypes.func,
  deleteUsers: PropTypes.func,
  currentUsers: PropTypes.array,
  titleArray: PropTypes.array,
};


export default UserList
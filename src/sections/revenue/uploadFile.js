import * as XLSX from 'xlsx';
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
  Typography,
  TextField,
  TablePagination,
  TableSortLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UploadFile ({onSetResult, currentResult, titleArray}) {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempQuery, setTempQuery] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const formatRow = (row) => {
    const tempData = [];
    row.map(item => {
      const tempItem = [...item];
      if(typeof(item[0]) !== 'string') tempItem[0] = tempItem[0].toString();
      if(typeof(item[1]) !== 'string') tempItem[1] = tempItem[1].toString();
      if(item[2] < 0) tempItem[2] =  Math.abs(tempItem[2])
      tempData.push(tempItem);
      return true;
    })
    return tempData;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet is what we want
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          const rows = jsonData.slice(1);
          const tempRow = formatRow(rows);
          onSetResult(tempRow);
          setTableData(tempRow);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

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

  const handleSearch = () => {
    setSearchQuery(tempQuery);
  }
  const filteredData = sortedData.filter((row) => row[0]?.toString().includes(searchQuery));
  

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    setTableData(currentResult)
  },[currentResult])

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
        <Typography sx={{ fontWeight: '500', fontSize: '18px' }}>
          {titleArray.length === 3 ? "Chart of Account" : "Monthly Result"} Table
        </Typography>
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
          <Button
            component="label"
            color="primary"
            variant="contained"
            startIcon={<FileUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              accept=".xlsx"
              onChange={(event) => handleFileUpload(event)}
              multiple={false}
            />
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {titleArray.map((title, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    <TableSortLabel
                      active={orderBy === title}
                      direction={orderBy === title ? orderDirection : 'asc'}
                      onClick={() => handleRequestSort(title)}
                    >
                      {title}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      style={{
                        border: 'none',
                        padding: '8px',
                        textAlign: 'center',
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
}

UploadFile.propTypes = {
  currentResult: PropTypes.array,
  titleArray: PropTypes.array,
  onSetResult: PropTypes.func,
};

export default UploadFile;

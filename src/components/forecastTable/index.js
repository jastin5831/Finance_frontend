import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Card,
    TablePagination
} from '@mui/material';
import PropTypes from 'prop-types';
import { parseInt } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { exportToExcel } from 'src/utils/exportToExcel';
import ForecastHeader from './header';
import ForecastContainer from './container';

const ForecastTable = ({ currentResult, month, date, setDate, changeResult, handleDateChange, selectedDate}) => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newRow, setNewRow] = useState(null);
  const [exportData, setExportData] = useState(false);
  const header = ['AccountID', 'RevenueExpenseID', 'Description'];

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
    setSearchQuery(inputRef.current.value);
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

  useEffect(() => {
    if(exportData) {
      if(tableData.length === 0 || month.length === 0 || date === null) {
        toast.warn('Export data is missing',{theme:'colored'})
      } else {
        exportToExcel({ data: tableData, month, fileName: `forecast ${date}`, type:'forecast' });
      }
      setExportData(false);
    }
  },[exportData, tableData, date, month])

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
        <ForecastHeader 
          inputRef={inputRef} date={date} setDate={setDate} 
          handleSearch={handleSearch} addEditableRow={addEditableRow}
          selectedDate={selectedDate} handleDateChange={handleDateChange}
          setExportData={setExportData} 
        />
        <ForecastContainer
          header={header} month={month} paginatedData={paginatedData} newRow={newRow}
          handleRequestSort={handleRequestSort} orderDirection={orderDirection} changeUserInfo={changeUserInfo}
          handleInputChange={handleInputChange} saveNewRow={saveNewRow} cancelNewRow={cancelNewRow} orderBy={orderBy}
        />
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
  selectedDate: PropTypes.object,
  setDate: PropTypes.func,
  changeResult: PropTypes.func,
  handleDateChange: PropTypes.func
};

export default ForecastTable;

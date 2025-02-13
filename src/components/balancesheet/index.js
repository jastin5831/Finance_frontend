import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';
import { Box, Card, TablePagination} from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
import { useAuthContext } from 'src/auth/hooks';
import { GetBalanceSheetByMonth } from 'src/api/transaction';
import { exportToExcel } from 'src/utils/exportToExcel';
import BalanceSheetHeader from './header'
import BalanceSheetContainer from './container'
import { handleData } from './func';

const monthArray = [
  'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

const BalaceSheetAnalysis = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({from:null, to:null});
  const [exportData, setExportData] = useState(false);
  const [months, setMonths] = useState([])
  const {user} = useAuthContext()  
  
  const handleSearch = () => {
    setSearchQuery(inputRef.current.value);
  }

  const handleDateChange = (date, type) => {
    if (!date) return; 
    let dateResult;
    if(type) {
      dateResult = {...selectedDate, from: date}
    } else {
      dateResult = {...selectedDate, to: date}
    }
    setSelectedDate(dateResult)
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

  const headerSet = (dataset) => {
    const headerTitle = []
    dataset.forEach((data, index) => {
      const year = parseInt(data.date/100, 10)
      const month = data.date - year*100
      const tempHeader = `${monthArray[month]} ${year}`
      headerTitle.push(tempHeader);
    });
    setMonths(headerTitle)
  }

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        if (selectedDate.from !== null && selectedDate.to !== null) {
          const startDate = dayjs(selectedDate.from).year()*100 + dayjs(selectedDate.from).month();
          const endDate = dayjs(selectedDate.to).year()*100 + dayjs(selectedDate.to).month();
          const dateRange = {from:startDate, to:endDate}
          const data = {
            userId: user._id,
            date: dateRange
          }
          const response = await GetBalanceSheetByMonth(data);
          if(response.type === 'success') {
            toast.success('Balance Sheet successfully loaded!', {theme:'colored'})
          } else {
            toast.error('Update Balance Sheet Error',{theme: "colored"})
          }
          const tempResult = handleData(response.data.data, dateRange);
          setTableData(tempResult)
          headerSet(tempResult[0].data)
        }
      } catch (err) {
        console.log("fetchBalanceSheet Error:",err)
      }
    };
    fetchBalanceSheet();
  }, [selectedDate, user._id]);

  useEffect(() => {
    if(exportData) {
      if(tableData.length === 0 || months.length === 0) {
        toast.warn('Export data is missing',{theme:'colored'})
      } else {
        exportToExcel({ data: tableData, month: months, fileName: `balancesheet ${selectedDate.from} - ${selectedDate.to}`, type:'balancesheet' });
      }
      setExportData(false);
    }
  },[exportData, tableData, selectedDate, months])

  return (
    <Box>
      <Card 
        sx={{ width: '100%', p: 2,}}
      >
        <BalanceSheetHeader
          handleSearch={handleSearch} inputRef={inputRef}
          setExportData={setExportData} 
          selectedDate={selectedDate} handleDateChange={handleDateChange}
        />
        <BalanceSheetContainer
          paginatedData={paginatedData} orderBy={orderBy} month={months}
          handleRequestSort={handleRequestSort} orderDirection={orderDirection}
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
  )
}

export default BalaceSheetAnalysis
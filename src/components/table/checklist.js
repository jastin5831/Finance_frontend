import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox
} from '@mui/material';  
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import { standardCOA } from 'src/utils/variable';

const ChecklistTable = ({COAResult, updateCOA}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  
  const setCOA = (acc, cag) => {
    const tempData = JSON.parse(JSON.stringify(COAResult))
    tempData.map(coa => {
        if(coa[1] === acc) {
            if(coa[4] === '') {
                coa[4] = cag; 
            } else if(coa[4] === cag){
                coa[4] = ''; 
            } else {
                toast.error('select only one category', {theme: "colored"})
            }
        }
        return true;
    })
    updateCOA(tempData)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = COAResult.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Category/Account
                </TableCell>
                {standardCOA.map((title, index) => (
                  <TableCell key={index} style={{ textAlign: 'center' }}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {row[1]}
                  </TableCell>
                  {standardCOA.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                      }}
                    >
                      <Checkbox 
                        checked={row[4] === cell}
                        onClick={(e) => {
                            setCOA(row[1],cell);
                        }}  
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
            rowsPerPageOptions={[7, 15, 25]}
            component="div"
            count={COAResult.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
  )
}

ChecklistTable.propTypes = {
  COAResult: PropTypes.array,
  updateCOA: PropTypes.func
};

export default ChecklistTable;
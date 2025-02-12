import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    TableSortLabel,
    Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const ForecastContainer = 
    ({
        header=[], month=[], paginatedData=[], newRow,
        handleRequestSort, orderDirection, changeUserInfo,
        handleInputChange, saveNewRow, cancelNewRow, orderBy
    }) => (
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
    )

ForecastContainer.propTypes = {
    header: PropTypes.array,
    month: PropTypes.array,
    orderBy: PropTypes.string,
    orderDirection: PropTypes.string,
    handleRequestSort: PropTypes.func,
    handleInputChange:PropTypes.func,
    paginatedData: PropTypes.array,
    newRow: PropTypes.object,
    saveNewRow: PropTypes.func,
    cancelNewRow: PropTypes.func,
    changeUserInfo: PropTypes.func,
};

export default ForecastContainer
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { updateForecast } from 'src/api/submission';
import { paths } from 'src/routes/paths';

const RevenueDetailTable = ({ data, selectedDate }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

  const [revenueForecasts, setRevenueForecasts] = useState(
    data?.revenue?.map(() => ({ value: '' })) || []
  );
  const [expenseForecasts, setExpenseForecasts] = useState(
    data?.expense?.map(() => ({ value: '' })) || []
  );
  const [salaryForecast, setSalaryForecast] = useState(0);
  const [rentForecast, setRentForecast] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleRevenueChange = (index, value) => {
    // Ensure the array length matches the data length
    setRevenueForecasts((prev) => {
      const updated = [...prev];
      while (updated.length <= index) {
        updated.push({ value: '' }); // Fill missing entries
      }
      updated[index].value = value;
      return updated;
    });
  };

  const handleExpenseChange = (index, value) => {
    setExpenseForecasts((prev) => {
      const updated = [...prev];
      while (updated.length <= index) {
        updated.push({ value: '' });
      }
      updated[index].value = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const forecastData = {
      revenueForecasts: revenueForecasts.map((forecast) => forecast.value),
      expenseForecasts: expenseForecasts.map((forecast) => forecast.value),
      salaryForecast,
      rentForecast,
      selectedDate: formattedDate,
    };

    try {
      const response = await updateForecast(forecastData);
      console.log('Forecast updated successfully:', response);
      navigate(paths.dashboard.root);
    } catch (errorr) {
      console.error('Failed to update forecast:', errorr);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Revenue</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Revenue</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.revenue?.map((i, index) => (
                <TableRow key={`revenue-${index}`}>
                  <TableCell>{i?.name || ''}</TableCell>
                  <TableCell>{i?.value || '0'}</TableCell>
                  <TableCell>{i?.forecast || 0}</TableCell>
                  <TableCell>
                    <TextField
                      value={revenueForecasts[index]?.value || ''}
                      onChange={(e) => handleRevenueChange(index, e.target.value)}
                      label="Forecast"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Expense</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.expense?.map((i, index) => (
                <TableRow key={`expense-${index}`}>
                  <TableCell>{i?.name}</TableCell>
                  <TableCell>{i?.value}</TableCell>
                  <TableCell>{i?.forecast || '0'}</TableCell>
                  <TableCell>
                    <TextField
                      label="Forecast"
                      value={expenseForecasts[index]?.value || ''}
                      onChange={(e) => handleExpenseChange(index, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, fontWeight: '500', fontSize: '18px' }}>Salary and Rent</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>

                <TableCell>Difference From Prior Period</TableCell>
                <TableCell>Difference from Forecast</TableCell>
                <TableCell>Forecast Next Reporting Period</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Salary</TableCell>
                <TableCell>{data?.salary}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <TextField
                    label="Forecast"
                    value={salaryForecast}
                    onChange={(e) => setSalaryForecast(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rent</TableCell>
                <TableCell>{data?.rent}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <TextField
                    label="Forecast"
                    value={rentForecast}
                    onChange={(e) => setRentForecast(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </>
  );
};
RevenueDetailTable.propTypes = {
  data: PropTypes.object,
  selectedDate: PropTypes.object,
};
export default RevenueDetailTable;
